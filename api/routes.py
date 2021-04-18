from api import app, db
# from flask import render_template, redirect, url_for
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

LOCAL_UI = os.getenv('LOCAL_UI')

# Demo Time Api
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}
# END Demo Time Api

@app.route('/api/v2.0/appointments/results.json')
def api_appointment_data():
    vaccine_info = get_vaccine_appointments()
    entries = vaccine_info[0]

    json_entries = json.dumps(entries, default = myconverter)

    return json_entries

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

def get_vaccine_appointments():
    alerts, action_text, zipcode_text = get_vax_info_from_request_args()
    entries = create_json_filtered_new(alerts)

    vaccine_info = [entries, alerts, action_text, zipcode_text]

    return vaccine_info

def get_vax_info_from_request_args():
    zipcode = request.args.get('zipcode')
    brands = request.args.get('brands')
    alerts = get_alerts(zipcode, brands)
    action_text, zipcode_text = get_action_text(zipcode, brands)

    return alerts, action_text, zipcode_text

def get_alerts(zipcode, brands):

    alerts = {"industry_str": "",
              "brands": False}

    if brands:
        try:
            brands_bool = bool(brands)
        except:
            brands_bool = False
        alerts["brands"] = brands_bool

    return alerts


def get_action_text(zipcode, brands):
    action_text = "index"
    zipcode_text = False

    if zipcode and brands:
        action_text += "?zipcode={}&brands={}".format(zipcode, brands)
        zipcode_text = True
    elif brands:
        action_text += "?brands={}".format(brands)
        zipcode_text = True
    elif zipcode:
        action_text += "?zipcode={}".format(zipcode)

    return action_text, zipcode_text



def create_json_filtered_new(alerts):
    json_modal = create_json_modal()
    q = create_query()
    json_filtered = {}
    json_filtered["available"] = {}
    json_filtered["unknown"] = {}
    json_filtered["not_available"] = {}
    json_filtered["no_links"] = {}

    json_filtered["available_set"] = set()

    json_filtered["None"] = {}
    special_list = []

    for item in q:
        main_entry = item[0]
        appointment_entry = item[1]
        main_entry_id = main_entry.id
        if not alerts["brands"]:
            main_entry.vaccines = None

        category = main_entry.category
        if not category:
            category = "None"

        if main_entry_id not in json_filtered[category]:
            add_one_filtered_new(json_filtered, main_entry)
        if appointment_entry:
            add_appointment_entry_to_json_filtered(json_filtered,
                                                   appointment_entry,
                                                   main_entry_id,
                                                   category)

    final_dict = create_final_dict(json_filtered)

    return final_dict

def create_json_modal():
    url = "https://storage.googleapis.com/covid-vaccine-data-public/" + \
          "pods_data.json"
    json_modal = load_json_from_url(url)

    return json_modal


def load_json_from_url(url):
    response = requests.get(url)
    json_file = response.json()

    return json_file


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


def add_one_filtered_new(json_filtered, main_entry):
    category = main_entry.category
    if not category:
        category = "None"
    category = category.replace("'", "")
    main_entry_id = main_entry.id
    json_filtered[category][main_entry_id] = {}
    specific_text = {}
    json_filtered_sec = json_filtered[category][main_entry_id]
    if main_entry.last_good:
        json_filtered_sec['last_check_message'] = get_difference_now(main_entry.last_good)
    elif not main_entry.last_good:
        json_filtered_sec['last_check_message'] = None
    json_filtered_sec['id'] = main_entry_id
    json_filtered_sec['x_parent'] = main_entry.x_parent
    json_filtered_sec['organization'] = main_entry.organization
    json_filtered_sec['name'] = main_entry.name
    json_filtered_sec['addr1'] = main_entry.addr1
    json_filtered_sec['addr2'] = main_entry.addr2
    json_filtered_sec['vaccines'] = main_entry.vaccines
    json_filtered_sec['map_zoom'] = main_entry.map_zoom
    json_filtered_sec['link'] = main_entry.link
    specific_text["residents"] = main_entry.text_full
    json_filtered_sec['comments'] = None
    json_filtered_sec['lat_loc'] = main_entry.lat_loc
    json_filtered_sec['long_loc'] = main_entry.long_loc
    json_filtered_sec['category'] = category
    json_filtered_sec['last_check_date'] = main_entry.last_check
    json_filtered_sec['last_time_available_date'] = main_entry.last_good
    json_filtered_sec['last_time_available_message'] = get_difference_now(main_entry.last_check)
    json_filtered_sec['current_uuid_set'] = main_entry.current_uuid_set
    json_filtered_sec['appointment_list'] = []
    json_filtered_sec['distance'] = -1
    if category == "available":
        json_filtered["available_set"].add(main_entry_id)

    add_eligible_text_new(json_filtered_sec, specific_text,
                      category)


def get_difference_now(end):
    start = datetime.datetime.utcnow()
    info_str = get_difference_as_str(start, end)

    return info_str

def get_difference_as_str(start, end):
    difference = start - end
    seconds = difference.total_seconds()
    if seconds < 60:
        info_str = "Less Than a Minute"
    elif seconds <= 3600:
        minutes = math.floor(seconds / 60)
        info_str = "{} Minute(s)".format(minutes)
    elif seconds >= 86400:
        days = math.floor(seconds / 86400)
        info_str = "{} Day(s)".format(days)
    elif seconds > 3600:
        hours = math.floor(seconds / 3600)
        info_str = "{} Hour(s)".format(hours)

    return info_str


def add_eligible_text_new(json_filtered_sec, specific_text,
                          category):
    json_filtered_sec['notes'] = None
    json_filtered_sec['warning_tier'] = 0
    if specific_text["residents"]:
        json_filtered_sec['notes'] = specific_text["residents"]
        json_filtered_sec['warning_tier'] = 3
    elif json_filtered_sec['x_parent'] == "-2":
        json_filtered_sec['notes'] = "You do NOT need to be a member of Kaiser Permanente".format(json_filtered_sec['name'])
        json_filtered_sec['warning_tier'] = 1
        if json_filtered_sec['addr1'].lower().strip() == "615 w avenue l.":
            json_filtered_sec['addr1'] = "2551 West Ave. H"
            json_filtered_sec['addr2'] = "Lancaster, CA 93534"
    elif json_filtered_sec['x_parent'] == "-11" and json_filtered_sec["category"] == "available":
        json_filtered_sec['notes'] = "CVS Pharmacy appointments go quickly"
        json_filtered_sec['warning_tier'] = 1
    elif json_filtered_sec['x_parent'] == "8" and json_filtered_sec["category"] == "available":
        json_filtered_sec['notes'] = "Rite Aid Pharmacy appointments go quickly"
        json_filtered_sec['warning_tier'] = 1
    elif json_filtered_sec['x_parent'] == "13" and json_filtered_sec["category"] == "available":
        json_filtered_sec['notes'] = "Walgreens Pharmacy appointments go quickly"
        json_filtered_sec['warning_tier'] = 1
    temp_fixes(json_filtered_sec)



def temp_fixes(json_filtered_sec):
    if json_filtered_sec["organization"] == "None":
        json_filtered_sec["organization"] = None
    if json_filtered_sec["link"] == "None":
        json_filtered_sec["link"] = None
    if json_filtered_sec["x_parent"] == "None":
        json_filtered_sec["x_parent"] = None
    if json_filtered_sec["notes"] == "None":
        json_filtered_sec["notes"] = None
    if json_filtered_sec["lat_loc"] == "None":
        json_filtered_sec["lat_loc"] = None
    if json_filtered_sec["long_loc"] == "None":
        json_filtered_sec["long_loc"] = None
    if json_filtered_sec["map_zoom"] == "None":
        json_filtered_sec["map_zoom"] = None


def add_appointment_entry_to_json_filtered(json_filtered,
                                           appointment_entry,
                                           main_key, category):
    appointment_dict = {}
    appointment_dict['date_str'] = appointment_entry.date_str
    appointment_dict['link_appointment'] = appointment_entry.link_appointment
    appointment_dict['appointment_num'] = appointment_entry.appointment_num
    appointment_dict['updated_date'] = appointment_entry.updated_date
    appointment_dict['id'] = appointment_entry.id
    json_filtered[category][main_key]["appointment_list"].append(appointment_dict)

def create_final_dict(json_filtered):
    final_list = []
    final_dict = {"result": "success", "data": {}}
    final_dict["data"]["available"] = []
    final_dict["data"]["unknown"] = []
    final_dict["data"]["not_available"] = []
    final_dict["data"]["None"] = []

    zipcode = request.args.get('zipcode')
    zipcode_bool = False
    if zipcode:
        try:
            zipcode_str = str(zipcode.strip())
            zipcode_int = int(zipcode_str)
            if len(zipcode_str) == 5:
                json_zipcode = get_json_zipcode()
                lat_loc, long_loc = get_lat_long_alt(json_zipcode, zipcode_str)
                lat_long_main = (lat_loc, long_loc)
                zipcode_bool = True
        except:
            zipcode_bool = False


    type_list = ["available", "unknown", "not_available", "None"]    
    for item in final_dict["data"]:
        for key in json_filtered[item]:
            if zipcode_bool:
                distance = get_distance_new(final_dict, json_filtered[item][key], lat_long_main,
                                            zipcode_int, json_zipcode)
                json_filtered[item][key]["distance"] = distance

            final_dict["data"][item].append(json_filtered[item][key])
        if zipcode_bool:
            final_dict["data"][item] = sorted(final_dict["data"][item], key=lambda i: i["distance"])
        elif not zipcode_bool:
            final_dict["data"][item] = sorted(final_dict["data"][item], key=lambda i: i["last_check_date"], reverse=True)


    return final_dict

# Get Coords(Lat/Long) from Zip Code
def get_json_zipcode():
    url = "https://raw.githubusercontent.com/hbmartin/zip-code-json/" + \
          "master/zip9.json"
    response = requests.get(url)
    zip_code_json = json.loads(response.content[5:])
    
    # Override any zip codes with custom coords
    zip_code_json["90895"] = ["-118.21837700", "33.83923700"]
    zip_code_json["91008"] = ["-117.9659", "34.1625"]
    zip_code_json["90755"] = ["-118.1679", "33.8020"]

    return zip_code_json


def get_lat_long_alt(json_zipcode, zipcode):

    if zipcode in json_zipcode:
        zipcode_lat_loc = json_zipcode[zipcode]
        lat_loc = float(zipcode_lat_loc[1])
        long_loc = float(zipcode_lat_loc[0])
    else:
        lat_loc = False
        long_loc = False

    return lat_loc, long_loc

def get_distance_new(final_dict, json_filtered_item, lat_long_main, zipcode_int, json_zipcode):
    if json_filtered_item["lat_loc"] and json_filtered_item["long_loc"]:
        try:
            lat_long_sub = (json_filtered_item["lat_loc"],
                            json_filtered_item["long_loc"])
            distance = geodesic(lat_long_main, lat_long_sub).mi

            if distance > 400 and zipcode_int >= 90001 and zipcode_int <= 96162:
                zipcode_new = items[6].split(" ")[-1]
                lat_loc, long_loc = get_lat_long_alt(json_zipcode, zipcode_new)
                if not lat_loc or not long_loc:
                    distance = -1
                else:
                    distance = geodesic(lat_long_main, lat_long_sub).mi
        except:
            distance = -1
    else:
        distance = -1

    return distance
