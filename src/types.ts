export interface LocationCardProps {
  last_check_message: string;
  last_check_date: string;
  last_check_val: number;
  last_check_unit: string;
  last_time_available_date: string;
  last_time_available_message: string;
  last_time_available_val: number;
  last_time_available_unit: string;
  id: string;
  x_parent: string;
  organization: string;
  name: string;
  addr1: string;
  addr2: string;
  vaccines: string | undefined;
  map_zoom: string;
  link: string;
  comments: string | undefined;
  lat_loc: string;
  long_loc: string;
  category: string;
  current_uuid_set: string;
  appointment_list: AppointmentProps[];
  distance: number;
  notes: string | undefined;
  warning_tier: number;
}

export interface AppointmentProps {
  date_str: string;
  link_appointment: string;
  appointment_num: number;
  updated_date: string;
  id: number;
}
