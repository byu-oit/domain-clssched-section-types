const conn = require('./connection')

const sectionTypesSql = `
select domain_value      as "section_type", 
       active_status     as "active_status", 
       description       as "long_description", 
       desc_15           as "description", 
       updated_by_id     as "updated_by_id", 
       date_time_updated as "date_time_updated" 
from   code_edit_value 
where  domain_name = 'SECTION_TYPE'`

exports.getSectionTypes = async function () {
  try {
    return await conn.executeQuery(sectionTypesSql, [], true)
  } catch (e) {
    throw e
  }
}