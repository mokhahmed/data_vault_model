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


module.exports = {
  users_model,
  users_model_doc
}