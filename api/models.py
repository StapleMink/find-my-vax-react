from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY


class PrimaryEntry(db.Model):
    __tablename__ = 'primary_entry'

    id = db.Column(db.String(50), primary_key=True)
    x_parent = db.Column(db.String(10))
    inactive = db.Column(db.String(30))
    organization = db.Column(db.Text)
    name = db.Column(db.Text)
    addr1 = db.Column(db.Text)
    addr2 = db.Column(db.Text)
    vaccines = db.Column(db.Text)
    logo = db.Column(db.Text)
    map_zoom = db.Column(db.Text)
    notes = db.Column(db.Text)
    notes_spn = db.Column(db.Text)
    alt = db.Column(db.Text)
    alt_spn = db.Column(db.Text)
    date = db.Column(db.Text)
    time = db.Column(db.Text)
    link = db.Column(db.Text)
    second_dose = db.Column(db.Text)
    text_full = db.Column(db.Text)
    comments = db.Column(db.Text)
    comments_spn = db.Column(db.Text)
    current_uuid_set = db.Column(db.String(50), unique=True)
    lat_loc = db.Column(db.Text)
    long_loc = db.Column(db.Text)
    category = db.Column(db.Text)
    last_check = db.Column(db.DateTime, index=True)
    last_good = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    data_type = db.Column(db.Text)
    industry_array = db.Column(ARRAY(db.Integer))
    domain = db.Column(db.String)
    total_appointments = db.Column(db.Integer)
    is_walk_thru = db.Column(db.Integer)
    is_drive_thru = db.Column(db.Integer)
    is_waitlist = db.Column(db.Integer)
    city = db.Column(db.Text)
    state = db.Column(db.Text)
    postal_code = db.Column(db.Text)
    managed_by = db.Column(db.Text)
    contact_email = db.Column(db.Text)
    contact_phone = db.Column(db.Text)
    age = db.Column(db.Text)
    has_walk_ins = db.Column(db.Integer)


    def __repr__(self):
        return '<PrimaryEntry {}>'.format(self.id)


class LastUpdated(db.Model):
    __tablename__ = 'last_updated'

    id = db.Column(db.Integer, primary_key=True)
    last_check = db.Column(db.DateTime, index=True)
    last_good = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<LastUpdated {}>'.format(self.id)    


class SubEntry(db.Model):
    __tablename__ = 'sub_entry'

    id = db.Column(db.String(50), primary_key=True)
    x_parent = db.Column(db.String(10))
    inactive = db.Column(db.String(30))
    organization = db.Column(db.Text)
    name = db.Column(db.Text)
    addr1 = db.Column(db.Text)
    addr2 = db.Column(db.Text)
    vaccines = db.Column(db.Text)
    logo = db.Column(db.Text)
    map_zoom = db.Column(db.Text)
    notes = db.Column(db.Text)
    notes_spn = db.Column(db.Text)
    alt = db.Column(db.Text)
    alt_spn = db.Column(db.Text)
    date = db.Column(db.Text)
    time = db.Column(db.Text)
    link = db.Column(db.Text)
    second_dose = db.Column(db.Text)
    text_full = db.Column(db.Text)
    comments = db.Column(db.Text)
    comments_spn = db.Column(db.Text)
    lat_loc = db.Column(db.Text)
    long_loc = db.Column(db.Text)
    category = db.Column(db.Text)
    last_check = db.Column(db.DateTime, index=True)
    last_good = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    data_type = db.Column(db.Text)

    def __repr__(self):
        return '<SubEntry {}>'.format(self.id)  


class AppointmentListsMain(db.Model):
    __tablename__ = 'appointment_list'

    id = db.Column(db.Integer, primary_key=True)
    date_str = db.Column(db.Text)
    link_appointment = db.Column(db.Text)
    appointment_num = db.Column(db.Integer)
    main_key = db.Column(db.String(50))
    sub_key = db.Column(db.String(50))
    uuid_set = db.Column(db.String(50))
    updated_date = db.Column(db.DateTime)
    times = db.Column(ARRAY(db.DateTime))
    date_dt = db.Column(db.DateTime)


    def __repr__(self):
        return '<AppointmentListsMain {}>'.format(self.id)    
