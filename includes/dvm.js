var md5 = require('md5');


function to_timestamp(field){
    return `
        PARSE_TIMESTAMP("%Y%m%d%H%M%S%Z", replace(${field}, "IST", "Asia/Kolkata"))
    `;
}

function to_hash(cols) {
  var cols_as_str = cols.map( x=> `IFNULL(UPPER(TRIM(CAST(${x} as string))), "--")`).reduceRight( (x,y) => `${x},${y}`)
  return `TO_BASE64(md5(concat(${cols_as_str})) )`;
}


function format_column_sql(config){
    
    if(config.is_calculated.toLowerCase() == "y")
        return config.calculated_by +" as "+ config.target_column_name;

    if(config.source_data_type.toLowerCase() == config.target_data_type) 
        return config.source_column_name +" as " + config.target_column_name;
    else if(config.target_data_type.toLowerCase()  == "int64")
        return "cast("+ config.source_column_name +" as int64) as " + config.target_column_name ;
    else if(config.target_data_type.toLowerCase()  == "float64")
        return "cast("+ config.source_column_name+ " as float64) as " + config.target_column_name;
    else if(config.target_data_type.toLowerCase()  == "timestamp")
        return  to_timestamp(config.source_column_name) +"  as " + config.target_column_name ;   
    else  
        throw target_data_type + " cannot be parsed.";
}


function render_transformed_cols(config){
    return `
        ${config.map( x => format_column_sql(x) ).reduce( (x,y) => `${x},${y}`)}
    `;
}

function is_not_empty(col){
    return `
        ${col} is not null and trim(cast(${col} as string)) != '' 
    `;
}

function is_empty(col){
    return `
        ${col} is null and trim(cast(${col} as string)) == '' 
    `;
}


function are_not_empty(cols){
    return cols.map(x => is_not_empty(x.source_column_name)).reduce((x,y) => `${x} and ${y}`);
}

function get_hub(config, source_table, source_name, hub_key){

    var hub_config = config.filter(x => x.is_key.toLowerCase() == "y");
    var hub_cols = hub_config.map(x => x.source_column_name);
    var hub_hash_id = to_hash(hub_cols);
    var cols = hub_config.map( x => format_column_sql(x) ).reduce( (x,y) => `${x},${y}`);
    var where_clause= hub_config.map(x => is_not_empty(x.source_column_name)).reduce((x,y) => `${x} and ${y}`);
    
    return `
        select distinct 
        ${hub_hash_id} as ${hub_key},
        ${cols},
        '${source_name}' as source,
        CURRENT_TIMESTAMP() as load_time
        from ${source_table} stg
        where ${where_clause}
    `;

}

function get_sat(config, source_table, hub_table, source_name, hub_key){

    var hub_config = config.filter(x => x.is_key.toLowerCase() == "y");
    var sat_config = config.filter(x => x.is_key.toLowerCase() == "n");
    var sat_cols = sat_config.map(x => x.source_column_name);
    var hash_diff = to_hash(sat_cols);
    var cols = sat_config.map( x => format_column_sql(x) ).reduce( (x,y) => `${x},${y}`);
    var join_clause = hub_config.map(x => "stg."+x.source_column_name +" = hub."+ x.target_column_name).reduce((x,y) => `${x} and ${y}`);
    
    return `
        select distinct
        hub.${hub_key} as ${hub_key},
        ${hash_diff} as hash_diff,
        ${cols},
        '${source_name}' as source,
        CURRENT_TIMESTAMP() as load_time
        from ${source_table} stg join ${hub_table} hub
        on ${join_clause}
    `;

}

function get_link(config_1, config_2, source_table, hub_table_1, hub_table_2, 
                    source_name, hub_key_1, hub_key_2,  link_key){

    var link_hash = to_hash([hub_key_1, hub_key_2])

    var hub_config_1 = config_1.filter(x => x.is_key.toLowerCase() == "y");
    var cols_1 = hub_config_1.map( x => format_column_sql(x) ).reduce( (x,y) => `${x},${y}`);
    var where_clause_1 = hub_config_1.map(x => is_not_empty(x.source_column_name)).reduce((x,y) => `${x} and ${y}`);
    var join_clause_1 = hub_config_1.map(x => "hub1."+x.target_column_name +" = a."+ x.source_column_name).reduce((x,y) => `${x} and ${y}`);

    var hub_config_2 = config_2.filter(x => x.is_key.toLowerCase() == "y");
    var cols_2 = hub_config_2.map( x => format_column_sql(x) ).reduce( (x,y) => `${x},${y}`);
    var where_clause_2 = hub_config_2.map(x => is_not_empty(x.source_column_name)).reduce((x,y) => `${x} and ${y}`);
    var join_clause_2 = hub_config_2.map(x => "hub2."+x.target_column_name +" = a."+ x.source_column_name).reduce((x,y) => `${x} and ${y}`);
    

    return `
        select
        ${link_hash} as ${link_key}, 
        ${hub_key_1},
        ${hub_key_2},
        "${source_name}" as source,
        CURRENT_TIMESTAMP() as load_time
        from (
            select distinct 
                ${cols_1},
                ${cols_2},
            from ${source_table}  stg
            where  ${where_clause_1} and ${where_clause_2}
        ) a 
        join ${hub_table_1} hub1 on ${join_clause_1}
        join ${hub_table_2} hub2 on ${join_clause_2}
    `;
}

function render_target_cols(config){
    return `
        ${config.map( x => x.target_column_name).reduce( (x,y) => `${x},${y}`)}
    `;
}



module.exports = {
  to_timestamp,
  render_transformed_cols,
  to_hash,
  render_target_cols,
  get_hub,
  get_sat,
  get_link
};
