import { SchemaType } from '../../types'
import { Shape } from '../../shape'
import { Page } from '../../page'
import { types, systemShapes } from '../../utils'
import { validateShape } from '../validations'

describe('validate', () => {
  describe('validations', () => {
    test('shape api id is required', () => {
      const author = new Shape('', {
        name: {
          type: types.text
        }
      })

      const errors = validateShape(author, [author])
      expect(errors.length).toBe(2)
    })

    test('shape api id must have correct format', () => {
      const noop = () => {
        console.log('hello')
      }

      const invalidAPIIds = [
        ...Object.keys(systemShapes).map((k: string) => systemShapes[k]),
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
        const author = new Shape('Hello', {
          name: {
            type: types.text
          }
        })

        author.apiId = apiId as string

        const errors = validateShape(author, [author])
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
        const author = new Shape(apiId, {
          name: {
            type: types.text
          }
        })

        const errors = validateShape(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('shape name is required', () => {
      const author = new Shape('Author', {
        name: {
          type: types.text
        }
      })

      author.name = (null as unknown) as string
      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(1)
    })

    test('shape name must have correct format', () => {
      const invalidShapeNames: any[] = [
        ...Object.keys(systemShapes).map((k: string) => systemShapes[k]),
        '$',
        'my shape name@',
        'Author v.2',
        'this is a shape.'
      ]

      invalidShapeNames.forEach(name => {
        const author = new Shape('Author', name, {
          name: {
            type: types.text
          }
        })

        const errors = validateShape(author, [author])
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
        const author = new Shape('Author', name, {
          name: {
            type: types.text
          }
        })

        const errors = validateShape(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('field api id is required', () => {
      const author = new Shape('Author', {
        name: {
          type: types.text
        }
      })

      author.fields.name.apiId = (null as unknown) as string

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('field api id must have correct format', () => {
      const noop = () => {
        console.log('hello')
      }

      const invalidAPIIds = [
        ...Object.keys(systemShapes).map((k: string) => systemShapes[k]),
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
        const author = new Shape('Author', {
          name: {
            type: types.text
          }
        })

        author.fields.name.apiId = apiId as string

        const errors = validateShape(author, [author])
        expect(errors.length >= 2).toBe(true)
      })
    })

    test('field type is required', () => {
      const author = new Shape('Author', {
        name: {
          type: types.calendar
        }
      })

      delete author.fields.name.type

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('field type must be a known type', () => {
      const type = 'notvalid' as SchemaType
      const author = new Shape('Author', {
        name: {
          type
        }
      })

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('ref must be a real shape APIID', () => {
      const author = new Page({
        apiId: 'author1',
        route: 'asdf',
        name: 'pageName',
        fields: {
          something: {
            type: types.shape,
            ref: 'something'
          }
        }
      })

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('shape type needs ref', () => {
      const author = new Page({
        apiId: 'author1',
        route: 'asdf',
        name: 'pageName',
        fields: {
          something: {
            type: types.shape
          }
        }
      })

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('A Page should be able to embed a shape', () => {
      const Author123 = new Shape('Author123', {
        name: {
          type: types.text
        }
      })
      const home = new Page({
        fields: { someField: { type: types.shape, ref: 'Author123' } },
        name: 'testName',
        apiId: 'asdf',
        route: 'someplace'
      })

      const errors = validateShape(home, [Author123])
      expect(errors).toHaveLength(0)
    })

    test('A Page should not be able to embed another page', () => {
      const about1 = new Page({
        fields: { header: { type: types.text } },
        name: 'about',
        apiId: 'about1',
        route: '/about'
      })
      const home = new Page({
        fields: { header: { type: types.shape, ref: 'about1' } },
        name: 'testName',
        apiId: 'home1',
        route: '/home'
      })

      const errors = validateShape(home, [home, about1])
      expect(errors).toHaveLength(2)
    })
  })
})
