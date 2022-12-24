load_id= "load_id_1234"
schema_name= "citibike_staging"
source_tables_prefix= "src_"
target_tables_prefix= "stg_js_"
tables_type = "incremental"
staging_tables = models.get_all()

dvform.create_staging_tables(
    load_id, 
    schema_name, 
    source_tables_prefix, 
    target_tables_prefix, 
    tables_type, 
    staging_tables
)

