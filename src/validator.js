const Validator = require('fastest-validator')
const { templateFormatter } = require('./templateFormatter')
const map = require('lodash.map')
const flatten = require('lodash.flatten')

const v = new Validator({
  messages: {
    // Register our new error message text
    invalidSelect: "The '{expected}' field must have string values in Values array!",
    invalidFieldsFormat: "Your template fields are incorrectly formatted!"
  }
})

v.add('tipeField', fields => {
  if (!Array.isArray(fields)) {
    return v.makeError('invalidFieldsFormat', null, 'fields')
  }
  const invalidFields = fields.filter(_f => _f.type === 'select' && (!_f.values || _f.values.length < 1))
  if(invalidFields.length > 0) {
    const field = invalidFields.pop()
    return v.makeError('invalidSelect', field.id)
  }
  return true
})

const namePattern = /^[a-z0-9-_ ]*$/i
const idPattern = /^[a-z][a-z_0-9]*$/i
const fieldTypes = [
  { name: 'text' },
  { name: 'button' },
  { name: 'image' },
  { name: 'markdown' },
  { name: 'code' },
  { name: 'boolean' },
  { name: 'html' },
  { name: 'select' }
]

const fieldSchema = {
  name: { type: 'string', pattern: namePattern },
  type: {
    type: 'tipeField',
    enum: map(fieldTypes, 'name')
  },
  mocks: { type: 'array', optional: true, items: 'string' },
  values: { type: 'array', optional: true, items: 'string' },
  list: { type: 'boolean', optional: true},
  description: { type: 'string', optional: true },
  disabled: { type: 'boolean', optional: true }
}

const refSchema = {
  name: { type: 'string', pattern: namePattern },
  type: { type: 'string' },
  list: { type: 'boolean', optional: true},
  description: { type: 'string', optional: true },
  disabled: { type: 'boolean', optional: true }
}

// TODO: add custom error messages for diff error types
const check = v.compile({
  $$strict: true,
  id: { type: 'string', pattern: idPattern, min: 3, max: 60 },
  name: { type: 'string', pattern: namePattern,  min: 3, max: 60 },
  disabled: { type: 'boolean', optional: true },
  description: { type: 'string', optional: true },
  multi: { type: 'boolean', optional: true },
  skuIds: { type: 'array', items: 'string', optional: true },
  fields: {
    type: 'tipeField',
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
      props: refSchema
    }
  }
})

const validateTemplate = template =>
  flatten(check(template))

const validateTemplates = templates => {
  // if Array (from api), just validate
  if (Array.isArray(templates)) {
    return flatten(
      templates
        .map(template => check(template))
        .filter(e => e !== true)
        .map(e => {
          const error = Array.isArray(e) ? e.pop() : e
          return {
            code: 200,
            message: `Template format is incorrect. ${error.message} at field "${error.field}"`
          }
        })
    )
  }

  return flatten(
    Object.keys(templates)
      .map(templateId => {
        // template needs fields
        if (!templates[templateId].fields) {
          return { field: `fields`, message: `Template is missing fields` }
        }

        // if Object (from the cli), format the template
        let formattedTemplate = templateFormatter({
          ...templates[templateId],
          id: templateId
        })
        return check(formattedTemplate)
      })
      .filter(e => e !== true)
  ).map(e => {
    const error = Array.isArray(e) ? e.pop() : e
    return {
      code: 200,
      message: `Template format is incorrect. ${error.message} at field "${error.field}"`
    }
  })
}

module.exports = {
  validateTemplates,
  validateTemplate
}
