const { validateTemplates } = require('../validator')
const { templates } = require('./mock.tipe')
const flatten = require('lodash.flatten')

describe('Validator', () => {
  it('Errors if template is invalid', () => {
    const badTemplates = [
      {
        id: 'home',
        name: 'home',
        fields: [{ id: 'title', name: 'title', type: 'text' }]
      },
      {
        id: 'about',
        name: 'about',
        fields: [{ id: 'title', name: 'title' }]
      }
    ]

    const validation = validateTemplates(badTemplates)

    const errors = flatten(
      validation.filter(e => e !== true)
    ).map(error => {
      return {
        code: 200,
        message: `Template format is incorrect. ${error.message} at field "${
          error.field
        }"`
      }
    })

    expect(errors[0].code).toEqual(200)
  })

  it('Does not return errors if template is valid', () => {
    const validation = validateTemplates(templates)

    const errors = flatten(
      validation.filter(e => e !== true)
    ).map(error => {
      return {
        code: 200,
        message: `Template format is incorrect. ${error.message} at field "${
          error.field
        }"`
      }
    })

    expect(errors).toEqual([])
  })

  it('Can validate templates from the CLI (template Objects)', () => {
    const templates = {
      feature: {
        name: 'Feature',
        id: 'feature',
        fields: {
          image: {
            type: 'image',
            name: 'feature image'
          },
          header: {
            type: 'text',
            name: 'feature header'
          },
          subHeader: {
            type: 'text',
            name: 'feature subheader'
          }
        }
      }
    }

    const validation = validateTemplates(templates)
    const errors = flatten(
      validation.filter(e => e !== true)
    ).map(error => {
      return {
        code: 200,
        message: `Template format is incorrect. ${error.message} at field "${
          error.field
        }"`
      }
    })

    expect(errors).toEqual([])
  })

  it('Will error if missing template is missing fields', () => {
    const templates = { foo: 'bar'}
    const validation = validateTemplates(templates)
    const errors = flatten(
      validation.filter(e => e !== true)
    ).map(error => {
      return {
        code: 200,
        message: `Template format is incorrect. ${error.message} at field "${
          error.field
        }"`
      }
    })

    expect(errors).toHaveLength(1)
  })
})
