import { fieldTypes, addMetaFields, createField } from '../fieldTypes'
import { types } from '../constants'
import { IFields } from '../../types'

describe('field types', () => {
  describe('addMetaFields', () => {
    test('name', () => {
      const opts = { type: types.text, name: '' }
      const result = addMetaFields(opts).name('first name')

      expect(opts.name).toBe('first name')

      result.name('other').name('last')
      expect(opts.name).toBe('last')
    })

    test('faker', () => {
      const opts = { type: types.text, faker: '' }
      const result = addMetaFields(opts).faker('first faker')

      expect(opts.faker).toBe('first faker')

      result.faker('other').faker('last')
      expect(opts.faker).toBe('last')
    })

    test('description', () => {
      const opts = { type: types.text, description: '' }
      const result = addMetaFields(opts).description('first description')

      expect(opts.description).toBe('first description')

      result.description('other').description('last')
      expect(opts.description).toBe('last')
    })

    test('chainable', () => {
      const chain = addMetaFields({ type: types.text })
      const result = chain
        .name('')
        .faker('')
        .description('')

      expect(chain).toEqual(result)
    })
  })
  describe('createField', () => {
    test('configures field correctly', () => {
      const result = createField({ type: types.text })

      expect(result.options.type).toBe(types.text)
    })
  })
  describe('types', () => {
    test('ref', () => {
      const field = fieldTypes.ref('Author')
      expect(field.options.type).toBe(types.ref)
      expect(field.options.ref).toBe('Author')
    })

    test('object', () => {
      const field = fieldTypes.object({
        name: fieldTypes.text()
      })
      expect(typeof field.options.type).toBe('object')
      const type = field.options.type as IFields

      expect(type.name.type).toBe(types.text)
    })

    test('text', () => {
      const field = fieldTypes.text()
      expect(field.options.type).toBe(types.text)
    })

    test('toggle', () => {
      const field = fieldTypes.toggle()
      expect(field.options.type).toBe(types.toggle)
    })

    test('markdown', () => {
      const field = fieldTypes.markdown()
      expect(field.options.type).toBe(types.markdown)
    })

    test('html', () => {
      const field = fieldTypes.html()
      expect(field.options.type).toBe(types.html)
    })

    test('asset', () => {
      const field = fieldTypes.asset()
      expect(field.options.type).toBe(types.asset)
    })

    test('code', () => {
      const field = fieldTypes.code()
      expect(field.options.type).toBe(types.code)
    })

    test('button', () => {
      const field = fieldTypes.button()
      expect(field.options.type).toBe(types.button)
    })
  })
})
