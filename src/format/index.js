const Enforcer = require('swagger-enforcer')

//TODO add auth check for links (ie only show POST if user is authorized to post)

exports.formatSectionTypes = function (sections, swagger) {
  return Enforcer.applyTemplate(swagger.root.definitions.section_types, null, Object.assign(sections, {
    collection_size: sections.length,
    values: sections.map(section => exports.formatSectionType(section, swagger))
  }))
}

exports.formatSectionType = function (section, swagger) {
  return Enforcer.applyTemplate(swagger.root.definitions.section_type_data, null, Object.assign(section, {
    section_type: section.section_type,
    description: section.description,
    long_description: section.long_description,
    active_status: section.active_status === 'A' ? 'Y' : 'N',
    date_time_updated: section.date_time_updated,
    updated_by_id: section.updated_by_id
  }))
}