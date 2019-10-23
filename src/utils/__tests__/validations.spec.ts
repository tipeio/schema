import { SchemaType, IFieldConfig } from '../../types'
import { Page } from '../../page'
import { reservedNames } from '../constants'
import { fieldTypes } from '../fieldTypes'
import { validateOneModel } from '../validations'

describe('validate', () => {
  describe('validations', () => {
    test('ref must be a real shape APIID', () => {
      const author = new Page({
        apiId: 'author1',
        name: 'pageName',
        fields: {
          something: fieldTypes.ref('something')
        },
        multi: false
      })

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('ref type needs ref', () => {
      const author = new Page({
        apiId: 'author1',
        name: 'pageName',
        fields: {
          something: fieldTypes.ref('')
        },
        multi: false
      })

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('A Page should be able to embed another page', () => {
      const about1 = new Page({
        fields: { header: fieldTypes.text() },
        name: 'about',
        apiId: 'about1',
        multi: false
      })
      const home = new Page({
        fields: { header: fieldTypes.ref('about1') },
        name: 'testName',
        apiId: 'home1',
        multi: false
      })

      const errors = validateOneModel(home, [home, about1])
      expect(errors).toHaveLength(0)
    })
  })
})
