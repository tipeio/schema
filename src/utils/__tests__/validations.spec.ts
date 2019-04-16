import { SchemaType, IFieldConfig, IShapeOptions } from '../../types'
import { Shape } from '../../shape'
import { Page } from '../../page'
import { reservedNames } from '../constants'
import { fieldTypes } from '../fieldTypes'
import { validateOneModel } from '../validations'

describe('validate', () => {
  describe('validations', () => {
    test('shape api id is required', () => {
      const author = new Shape(({
        name: 'Author',
        fields: {
          name: fieldTypes.text().name('name')
        }
      } as unknown) as IShapeOptions)

      const errors = validateOneModel(author, [author])
      expect(errors.length).toBe(1)
    })

    test('shape api id must have correct format', () => {
      const noop = () => {
        console.log('hello')
      }

      const invalidAPIIds = [
        ...Object.keys(reservedNames).map((k: string) => reservedNames[k]),
        '99',
        '__Author',
        '_99',
        'My Id',
        'My-id',
        99,
        noop,
        true,
        false,
        NaN,
        null,
        /test/,
        {},
        []
      ]

      invalidAPIIds.forEach(apiId => {
        const author = new Shape({
          name: 'Hello',
          apiId: 'Hello',
          fields: {
            name: fieldTypes.text()
          }
        })

        author.apiId = apiId as string

        const errors = validateOneModel(author, [author])
        expect(errors.length >= 1).toBe(true)
      })

      const validAPIIds = [
        'Author',
        'My_Author',
        'MyAuthor',
        'Author99',
        'Author_99',
        'Author_99_My'
      ]

      validAPIIds.forEach(apiId => {
        const author = new Shape({
          apiId,
          name: apiId,
          fields: {
            name: fieldTypes.text()
          }
        })

        const errors = validateOneModel(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('shape name is required', () => {
      const author = new Shape({
        name: 'Author',
        apiId: 'Author',
        fields: {
          name: fieldTypes.text()
        }
      })

      author.name = (null as unknown) as string
      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(1)
    })

    test('shape name must have correct format', () => {
      const invalidShapeNames: any[] = [
        ...Object.keys(reservedNames).map((k: string) => reservedNames[k]),
        '$',
        'my shape name@',
        'Author v.2',
        'this is a shape.'
      ]

      invalidShapeNames.forEach(name => {
        const author = new Shape({
          name,
          apiId: 'Author',
          fields: {
            name: fieldTypes.text()
          }
        })

        const errors = validateOneModel(author, [author])
        expect(errors).toHaveLength(1)
      })

      const validShapeNames = [
        'Author',
        'Author v2',
        'Author v-2',
        'My-author_person',
        'A blog post'
      ]

      validShapeNames.forEach(name => {
        const author = new Shape({
          name,
          apiId: 'Author',
          fields: {
            name: fieldTypes.text()
          }
        })

        const errors = validateOneModel(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('field api id is required', () => {
      const author = new Shape({
        name: 'Author',
        apiId: 'Author',
        fields: {
          name: fieldTypes.text()
        }
      })

      author.fields.name.apiId = (null as unknown) as string

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('field api id must have correct format', () => {
      const noop = () => {
        console.log('hello')
      }

      const invalidAPIIds = [
        ...Object.keys(reservedNames).map((k: string) => reservedNames[k]),
        '99',
        '__Author',
        '_99',
        'My Id',
        'My-id',
        99,
        noop,
        true,
        false,
        NaN,
        null,
        /test/,
        {},
        []
      ]

      invalidAPIIds.forEach(apiId => {
        const author = new Shape({
          name: 'Author',
          apiId: 'Author',
          fields: {
            name: fieldTypes.text()
          }
        })

        author.fields.name.apiId = apiId as string

        const errors = validateOneModel(author, [author])
        expect(errors.length >= 2).toBe(true)
      })
    })

    test('field type is required', () => {
      const author = new Shape({
        name: 'Author',
        apiId: 'Author',
        fields: {
          name: fieldTypes.calendar()
        }
      })

      delete author.fields.name.type

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('field type must be a known type', () => {
      const type = 'notvalid' as SchemaType
      const author = new Shape({
        name: 'Author',
        apiId: 'Author',
        fields: {
          name: { options: { type } } as IFieldConfig
        }
      })

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('ref must be a real shape APIID', () => {
      const author = new Page({
        apiId: 'author1',
        route: 'asdf',
        name: 'pageName',
        fields: {
          something: fieldTypes.ref('something')
        }
      })

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('ref type needs ref', () => {
      const author = new Page({
        apiId: 'author1',
        route: 'asdf',
        name: 'pageName',
        fields: {
          something: fieldTypes.ref('')
        }
      })

      const errors = validateOneModel(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('A Page should be able to embed a shape', () => {
      const Author = new Shape({
        name: 'Author123',
        apiId: 'Author123',
        fields: {
          name: fieldTypes.text()
        }
      })

      const home = new Page({
        fields: { someField: fieldTypes.ref(Author) },
        name: 'testName',
        apiId: 'asdf',
        route: 'someplace'
      })

      const errors = validateOneModel(home, [Author])
      expect(errors).toHaveLength(0)
    })

    test('A Page should not be able to embed another page', () => {
      const about1 = new Page({
        fields: { header: fieldTypes.text() },
        name: 'about',
        apiId: 'about1',
        route: '/about'
      })
      const home = new Page({
        fields: { header: fieldTypes.ref('about1') },
        name: 'testName',
        apiId: 'home1',
        route: '/home'
      })

      const errors = validateOneModel(home, [home, about1])
      expect(errors).toHaveLength(2)
    })
  })
})
