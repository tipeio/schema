const Validator = require('fastest-validator')
const { templateFormatter } = require('./templateFormatter')
const map = require('lodash.map')

const v = new Validator()

const namePattern = /^[a-z0-9-_ ]*$/i
const idPattern = /^[a-z][a-z_0-9]*$/i
const fieldTypes = [
  { name: 'text' },
  { name: 'button' },
  { name: 'image' },
  { name: 'markdown' },
  { name: 'code' },
  { name: 'boolean' }
]

const fieldSchema = {
  id: { type: 'string', pattern: idPattern },
  name: { type: 'string', pattern: namePattern },
  type: { type: 'string', enum: map(fieldTypes, 'name') },
  list: { type: 'boolean', optional: true },
  description: { type: 'string', optional: true },
  disabled: { type: 'boolean', optional: true }
}

// TODO: add custom error messages for diff error types
const check = v.compile({
  $$strict: true,
  id: { type: 'string', pattern: idPattern },
  name: { type: 'string', pattern: namePattern },
  disabled: { type: 'boolean', optional: true },
  description: { type: 'string', optional: true },
  multi: { type: 'boolean', optional: true },
  fields: {
    type: 'array',
    min: 1,
    items: {
      type: 'object',
      props: fieldSchema
    }
  },
  refs: {
    type: 'array',
    optional: true,
    items: {
      type: 'object',
      props: { ...fieldSchema, type: { type: 'string' } }
    }
  }
})

const validateTemplates = templates => {
  // if Array (from api), just validate
  if (Array.isArray(templates)) {
    return templates.map(template => check(template))
  }

  // if Object (from the cli), format the template
  return Object.keys(templates).map(templateId => {
    // template needs fields
    if (!templates[templateId].fields) {
      return { field: `fields`, message: `Template is missing fields`}
    }

    let formattedTemplate = templateFormatter({
      ...templates[templateId],
      id: templateId
    })
    return check(formattedTemplate)
  })
}

module.exports = {
  validateTemplates
}
