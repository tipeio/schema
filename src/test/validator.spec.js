const { validateTemplates } = require('../validator')
const { templates } = require('./mock.tipe')

describe('Validator', () => {
  it('Errors if template is invalid', () => {
    const badTemplates = [
      {
        id: 'home',
        name: 'home',
        fields: {
          name: {name: 'title', type: 'text' }
        }
      },
      {
        id: 'about',
        name: 'about',
        fields: {
          title: { type: 'text', name: 'title' }
        }
      }
    ]

    const validation = validateTemplates(badTemplates)

    expect(validation[0].code).toEqual(200)
  })

  it('Does not return errors if template is valid', () => {
    const validation = validateTemplates(templates)

    expect(validation).toEqual([])
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

    expect(validation).toEqual([])
  })

  it('Will error if missing template is missing fields', () => {
    const templates = { foo: 'bar'}
    const validation = validateTemplates(templates)

    expect(validation).toHaveLength(1)
  })

  it('passes list of refs', () => {
    const templateWithRefs = {
      id: 'about',
      name:'about',
      fields: {
        title: {name: 'title', type: 'text'}
      },
      refs: {
        feature1: {
          name: 'feature',
          list: true,
          type: 'feature'
        }
      }
    }
    const _templates = templates
    _templates.about = templateWithRefs
    const validation = validateTemplates(_templates)
    expect(validation).toEqual([])
  })
  it('passes sku id', () => {
    const templateWithSkuIds = {
      id: 'about',
      name:'about',
      skuIds: ['skuId'],
      fields: {
        title: {name: 'title', type: 'text'}
      }
    }
    const _templates = templates
    _templates.about = templateWithSkuIds
    const validation = validateTemplates(_templates)
    expect(validation).toEqual([])
  })
})

