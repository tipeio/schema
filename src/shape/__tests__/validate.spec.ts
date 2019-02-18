import { SchemaType } from '../../types'
import { Shape } from '../shape'
import { types, systemShapes } from '../../utils'
import { validateShape } from '../validate'

describe('validate', () => {
  describe('validations', () => {
    test('shape api id is required', () => {
      const author = new Shape('', {
        name: {
          type: types.simpletext
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
            type: types.simpletext
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
            type: types.simpletext
          }
        })

        const errors = validateShape(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('shape name is required', () => {
      const author = new Shape('Author', {
        name: {
          type: types.simpletext
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
            type: types.simpletext
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
            type: types.simpletext
          }
        })

        const errors = validateShape(author, [author])
        expect(errors.length).toBe(0)
      })
    })

    test('field api id is required', () => {
      const author = new Shape('Author', {
        name: {
          type: types.simpletext
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
            type: types.simpletext
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
      const author = new Shape('Author', {
        name: {
          type: types.shape,
          ref: 'notrealref'
        }
      })

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('shape type needs ref', () => {
      const author = new Shape('Author', {
        name: {
          type: types.shape
        }
      })

      const errors = validateShape(author, [author])
      expect(errors).toHaveLength(2)
    })

    test('nested fields cannot have refs or assets', () => {
      const post = new Shape('Post', {
        details: {
          type: {
            author: {
              type: types.shape,
              ref: 'Author'
            }
          }
        },
        images: {
          type: {
            header: {
              type: types.asset
            }
          }
        }
      })

      const author = new Shape('Author', {
        name: {
          type: types.simpletext
        }
      })

      const errors = validateShape(post, [post, author])

      expect(errors).toHaveLength(4)
    })
  })
})
