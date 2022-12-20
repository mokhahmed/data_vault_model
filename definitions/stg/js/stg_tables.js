

stage_tables = [
  { 'source'     : 'src_js_bikes', 
    'target'     : 'stg_js_bikes',
    'schema'     : 'stg_citibike',
    'model'      : dv_models.bikes_model,
    'model_doc'  : dv_models.bikes_model_doc
  },
  { 'source'     : 'src_js_trips', 
    'target'     : 'stg_js_trips',
    'schema'     : 'stg_citibike',
    'model'      : dv_models.trips_model,
    'model_doc'  : dv_models.trips_model_doc
  },
  { 'source'     : 'src_js_users', 
    'target'     : 'stg_js_users',
    'schema'     : 'stg_citibike',
    'model'      : dv_models.users_model,
    'model_doc'  : dv_models.users_model_doc
  },
  { 'source'     : 'src_js_stations', 
    'target'     : 'stg_js_stations',
    'schema'     : 'stg_citibike',
    'model'      : dv_models.stations_model,
    'model_doc'  : dv_models.stations_model_doc
  },
]

dvm.create_staging_tables("job_id_1", stage_tables)

