from api import app, db
from flask import Markup, jsonify
from datetime import datetime
import datetime
import math
import os
import json
import requests
import time
from flask import request
from api.models import PrimaryEntry, AppointmentListsMain
from geopy.distance import geodesic
from dateutil import tz

# Demo Time Api
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
# END Demo Time Api

@app.route('/api/v2.0/appointments/results.json')
def api_appointment_data():
    # Get coords for all cali zips once
    global all_zipcode_coords
    all_zipcode_coords = get_lat_long_for_cali_zipcodes()

    vaccine_info = get_vaccine_appointments()
    entries = vaccine_info[0]

    json_entries = json.dumps(entries, default = myconverter)

    return json_entries

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


''' Get Coords(Lat/Long) from Zip Code '''
def get_lat_long_for_cali_zipcodes():
    # Thanks to hbmartin for this :)
    url = "https://raw.githubusercontent.com/hbmartin/zip-code-json/" + \
          "master/zip9.json"
    response = requests.get(url)
    zip_code_json = json.loads(response.content[5:])
    
    # Override/Add any zip codes with custom coords
    zip_code_json["90895"] = ["-118.21837700", "33.83923700"]
    zip_code_json["91008"] = ["-117.9659", "34.1625"]
    zip_code_json["90755"] = ["-118.1679", "33.8020"]

    return zip_code_json


def get_vaccine_appointments():
    zipcode = request.args.get('zipcode')
    brands = request.args.get('brands')
    flags = get_flags(zipcode, brands)

    entries = create_appointment_json(flags)

    vaccine_info = [entries, flags]

    return vaccine_info

def get_flags(zipcode, brands):

    flags = {"brands": False}

    if brands:
        try:
            brands_bool = bool(brands)
        except:
            brands_bool = False
        flags["brands"] = brands_bool

    return flags


def create_appointment_json(flags):
    q = create_query()
    json_data = {}
    json_data["available"] = {}
    json_data["unknown"] = {}
    json_data["not_available"] = {}
    # To Deprecate
    # json_data["no_links"] = {}

    special_list = []

    for item in q:
        main_entry = item[0]
        appointment_entry = item[1]
        main_entry_id = main_entry.id
        if not flags["brands"]:
            main_entry.vaccines = None

        category = main_entry.category
        if not category:
            continue

        # Try to add appointment, if location does not exist add location and the appointment
        if main_entry_id not in json_data[category]:
            add_location_and_appointment(json_data, main_entry)
        if appointment_entry:
            add_appointment_to_location(json_data,
                                                   appointment_entry,
                                                   main_entry_id,
                                                   category)

    final_dict = create_final_dict(json_data)

    return final_dict


''' SQL Functions '''
def create_query():
    prim_expression = PrimaryEntry.current_uuid_set==AppointmentListsMain.uuid_set

    query = db.session.query(PrimaryEntry,
                             AppointmentListsMain
                             ).outerjoin(AppointmentListsMain,
                             prim_expression).order_by(
                             PrimaryEntry.id,
                             PrimaryEntry.current_uuid_set,
                             AppointmentListsMain.date_str).all()

    return query


def add_location_and_appointment(json_data, main_entry):
    category = main_entry.category
    if not category:
        category = "None"
    category = category.replace("'", "")
    main_entry_id = main_entry.id
    json_data[category][main_entry_id] = {}
    specific_text = {}
    json_location_data = json_data[category][main_entry_id]
    json_location_data['id'] = main_entry_id
    json_location_data['x_parent'] = main_entry.x_parent
    json_location_data['organization'] = main_entry.organization
    json_location_data['age'] = main_entry.age
    json_location_data['name'] = main_entry.name
    json_location_data['addr1'] = main_entry.addr1
    json_location_data['addr2'] = main_entry.addr2
    json_location_data['vaccines'] = main_entry.vaccines
    json_location_data['map_zoom'] = main_entry.map_zoom
    json_location_data['link'] = main_entry.link
    specific_text["residents"] = main_entry.text_full
    json_location_data['comments'] = None
    json_location_data['lat_loc'] = main_entry.lat_loc
    json_location_data['long_loc'] = main_entry.long_loc
    json_location_data['category'] = category
    json_location_data['last_check_date'] = main_entry.last_check
    json_location_data['last_check_message'], json_location_data['last_check_val'], json_location_data['last_check_unit'] = get_time_difference(main_entry.last_check)
    json_location_data['last_time_available_date'] = main_entry.last_good
    json_location_data['last_time_available_message'], json_location_data['last_time_available_val'], json_location_data['last_time_available_unit'] = get_time_difference(main_entry.last_good)
    json_location_data['current_uuid_set'] = main_entry.current_uuid_set
    json_location_data['appointment_list'] = []
    json_location_data['distance'] = -1
    json_location_data['is_walk_thru'] = main_entry.is_walk_thru
    json_location_data['is_drive_thru'] = main_entry.is_drive_thru
    json_location_data['is_waitlist'] = main_entry.is_waitlist
    json_location_data['has_walk_ins'] = main_entry.has_walk_ins

    inject_additional_location_info(json_location_data, specific_text, category)


''' Get time differences '''
def get_time_difference(end):
    start = datetime.datetime.utcnow()
    info_str, info_val, info_unit = get_time_difference_string(start, end)

    return info_str, info_val, info_unit


''' Format time differences into nice strings! '''
def get_time_difference_string(start, end):
    if end is None:
        return None, None, None
    difference = start - end
    seconds = difference.total_seconds()
    if seconds < 60:
        info_str = "Less Than a Minute Ago"
        info_val = seconds
        info_unit = "SEC"
    elif seconds <= 3600:
        minutes = math.floor(seconds / 60)
        info_val = minutes
        info_unit = "MIN"
        if minutes == 1:
            info_str = "{} Minute Ago".format(minutes)
        else:
            info_str = "{} Minutes Ago".format(minutes)
    elif seconds >= 86400:
        days = math.floor(seconds / 86400)
        info_val = days
        info_unit = "DAY"
        if days == 1:
            info_str = "{} Day Ago".format(days)
        else:
            info_str = "{} Days Ago".format(days)
    elif seconds > 3600:
        hours = math.floor(seconds / 3600)
        info_val = hours
        info_unit = "HR"
        if hours == 1:
            info_str = "{} Hour Ago".format(hours)
        else:
            info_str = "{} Hours Ago".format(hours)

    return info_str, info_val, info_unit


''' Add additional info to locatiosn such as images and notes! '''
def inject_additional_location_info(json_location_data, specific_text, category):
    json_location_data['notes'] = None
    json_location_data['warning_tier'] = 0
    if specific_text["residents"]:
        json_location_data['notes'] = specific_text["residents"]
        json_location_data['warning_tier'] = 3
    elif json_location_data['x_parent'] == "-2":
        json_location_data['notes'] = "You do NOT need to be a member of Kaiser Permanente".format(json_location_data['name'])
        json_location_data['warning_tier'] = 1
        if json_location_data['addr1'].lower().strip() == "615 W Avenue l.":
            json_location_data['addr1'] = "2551 West Ave. H"
            json_location_data['addr2'] = "Lancaster, CA 93534"
    elif json_location_data['x_parent'] == "-21" and json_location_data["category"] == "available":
        json_location_data['notes'] = "CVS Pharmacy appointments go quickly"
        json_location_data['warning_tier'] = 2
    elif json_location_data['x_parent'] == "8" and json_location_data["category"] == "available":
        json_location_data['notes'] = "Rite Aid Pharmacy appointments go quickly"
        json_location_data['warning_tier'] = 2
    elif json_location_data['x_parent'] == "-13" and json_location_data["category"] == "available":
        json_location_data['notes'] = "Walgreens Pharmacy appointments go quickly"
        json_location_data['warning_tier'] = 2
    temp_fixes(json_location_data)


''' Fix a couple DB errors until DB records purged. TO Deprecate. '''
def temp_fixes(json_location_data):
    if json_location_data["organization"] == "None":
        json_location_data["organization"] = None
    if json_location_data["link"] == "None":
        json_location_data["link"] = None
    if json_location_data["x_parent"] == "None":
        json_location_data["x_parent"] = None
    if json_location_data["notes"] == "None":
        json_location_data["notes"] = None
    if json_location_data["lat_loc"] == "None":
        json_location_data["lat_loc"] = None
    if json_location_data["long_loc"] == "None":
        json_location_data["long_loc"] = None
    if json_location_data["map_zoom"] == "None":
        json_location_data["map_zoom"] = None


def add_appointment_to_location(json_data, appointment_entry, main_key, category):
    appointment_dict = {}
    appointment_dict['date_str'] = appointment_entry.date_str
    appt_date = datetime.datetime.strptime(appointment_entry.date_str, '%m/%d/%Y')
    appointment_dict['date_month'] = appt_date.strftime("%B")
    appointment_dict['date_day'] = appt_date.strftime("%d")
    appointment_dict['date_year'] = appt_date.strftime("%Y")
    appointment_dict['link_appointment'] = appointment_entry.link_appointment
    appointment_dict['appointment_num'] = appointment_entry.appointment_num
    appointment_dict['updated_date'] = appointment_entry.updated_date
    appointment_dict['id'] = appointment_entry.id
    json_data[category][main_key]["appointment_list"].append(appointment_dict)

def create_final_dict(json_data):
    final_list = []
    final_dict = {"result": "success", "data": {}}
    final_dict["data"]["available"] = []
    final_dict["data"]["unknown"] = []
    final_dict["data"]["not_available"] = []

    zipcode = request.args.get('zipcode')
    zipcode_bool = False
    if zipcode:
        try:
            zipcode_str = str(zipcode.strip())
            zipcode_int = int(zipcode_str)
            if len(zipcode_str) == 5:
                lat_loc, long_loc = get_lat_long_from_zip(zipcode_str)
                query_lat_long = (lat_loc, long_loc)
                print("Requested")
                print(query_lat_long)
                print("End Requested")
                zipcode_bool = True
        except:
            zipcode_bool = False


    type_list = ["available", "unknown", "not_available"]    
    for item in final_dict["data"]:
        for key in json_data[item]:
            if zipcode_bool:
                print("---")
                distance = get_distance_appointment(final_dict, json_data[item][key], query_lat_long,
                                            zipcode_int)
                print("Dist: " + repr(distance))
                json_data[item][key]["distance"] = distance

            final_dict["data"][item].append(json_data[item][key])
        if zipcode_bool:
            final_dict["data"][item] = sorted(final_dict["data"][item], key=lambda i: i["distance"])
        elif not zipcode_bool:
            final_dict["data"][item] = sorted(final_dict["data"][item], key=lambda i: i["last_check_date"], reverse=True)


    return final_dict


def get_lat_long_from_zip(zipcode):

    if zipcode in all_zipcode_coords:
        zipcode_lat_loc = all_zipcode_coords[zipcode]
        lat_loc = float(zipcode_lat_loc[1])
        long_loc = float(zipcode_lat_loc[0])
    else:
        lat_loc = False
        long_loc = False

    return lat_loc, long_loc

def get_distance_appointment(final_dict, json_location, query_lat_long, zipcode_int):
    # print("Loc: " + json_location["lat_loc"] + "-:-" + json_location["long_loc"])
    if json_location["lat_loc"] and json_location["long_loc"]:
        try:
            location_lat_long = (json_location["lat_loc"],
                            json_location["long_loc"])
            distance = geodesic(query_lat_long, location_lat_long).mi

            if distance > 400 and zipcode_int >= 90001 and zipcode_int <= 96162:
                zipcode_new = items[6].split(" ")[-1]
                lat_loc, long_loc = get_lat_long_from_zip(all_zipcode_coords, zipcode_new)
                print(lat_loc,long_loc)
                if not lat_loc or not long_loc:
                    distance = -1
                else:
                    distance = geodesic(query_lat_long, location_lat_long).mi
        except:
            distance = -1
    else:
        print("No lat long avail")
        distance = -1

    return distance
