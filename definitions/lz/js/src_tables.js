source_tables = [
  {"name": "src_js_users", 'schema': "dv_demo"},
  {"name": "src_js_bikes", 'schema': "dv_demo"},
  {"name": "src_js_stations", 'schema': "dv_demo"},
  {"name": "src_js_trips", 'schema': "dv_demo"}
]

dvm.create_src_tables(source_tables)