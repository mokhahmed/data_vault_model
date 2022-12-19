var users_model =  [
  {
    "source_column_name": "user_id",
    "source_data_type": "integer",
    "target_column_name": "user_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "user id"
  },
  {
    "source_column_name": "user_type",
    "source_data_type": "string",
    "target_column_name": "user_type",
    "target_data_type": "string",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "User Type (Customer = 24-hour pass or 7-day pass user, Subscriber = Annual Member)"
  },
  {
    "source_column_name": "gender",
    "source_data_type": "string",
    "target_column_name": "gender",
    "target_data_type": "string",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Gender (unknown, male, female)"
  },
  {
    "source_column_name": "birth_year",
    "source_data_type": "integer",
    "target_column_name": "birth_year",
    "target_data_type": "integer",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Year of Birth"
  },
  {
    "source_column_name": "customer_plan",
    "source_data_type": "string",
    "target_column_name": "customer_plan",
    "target_data_type": "string",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "The name of the plan that determines the rate charged for the trip"
  },
]

var users_model_doc  = {}
users_model.forEach(el => { users_model_doc[el.target_column_name+""] = el.description});

var bikes_model = [
  {
    "source_column_name": "bike_id",
    "source_data_type": "integer",
    "target_column_name": "bike_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Bike ID"
  },
  {
    "source_column_name": "bike_type",
    "source_data_type": "string",
    "target_column_name": "bike_type",
    "target_data_type": "string",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Bike Type"
  }
]

var bikes_model_doc  = {}
bikes_model.forEach(el => { bikes_model_doc[el.target_column_name+""] = el.description});

var trips_model = [
  {
    "source_column_name": "bike_id",
    "source_data_type": "integer",
    "target_column_name": "bike_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Bike ID"
  },
  {
    "source_column_name": "user_id",
    "source_data_type": "integer",
    "target_column_name": "user_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "User ID"
  },
   {
    "source_column_name": "start_station_id",
    "source_data_type": "integer",
    "target_column_name": "start_station_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Start Station ID"
  },
  {
    "source_column_name": "end_station_id",
    "source_data_type": "integer",
    "target_column_name": "end_station_id",
    "target_data_type": "integer",
    "is_key": "Y", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "End Station ID"
  },
   {
    "source_column_name": "start_time",
    "source_data_type": "datetime",
    "target_column_name": "start_time",
    "target_data_type": "datetime",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Start Time, in NYC local time."
  },
  {
    "source_column_name": "stop_time",
    "source_data_type": "datetime",
    "target_column_name": "stop_time",
    "target_data_type": "datetime",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Stop Time, in NYC local time."
  },
   {
    "source_column_name": "trip_duration",
    "source_data_type": "integer",
    "target_column_name": "trip_duration",
    "target_data_type": "integer",
    "is_key": "N", 
    "is_calculated": "N",
    "calculated_by": "",
    "description": "Trip Duration (in seconds)"
  }
]

var trips_model_doc  = {}
trips_model.forEach(el => { trips_model_doc[el.target_column_name+""] = el.description});

module.exports = {
  users_model,
  users_model_doc,
  bikes_model,
  bikes_model_doc,
  trips_model,
  trips_model_doc
}