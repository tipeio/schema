import { IShape } from '../../types'
import { Shape } from '../shape'
import { types, systemShapes } from '../../utils'
import {
  modelNameValidation,
  dupeModelValidation,
  validateModels,
  schemaFieldValidation
} from '../validate'

describe('validate', () => {
  describe('shapeNameValidation', () => {
    test('checks if name is given', () => {
      const shape = {} as IShape
      const errors = modelNameValidation(shape, [shape])

      expect(errors).toHaveLength(1)
      expect(errors[0].error).toMatch(/empty/)
    })

    test('checks if name is a string', () => {
      const names: string[] = [
        (1 as unknown) as string,
        ({} as unknown) as string,
        ([] as unknown) as string,
        (function() {
          console.log('hello')
        } as unknown) as string,
        (Symbol as unknown) as string,
        (true as unknown) as string
      ]
      const shape = {} as IShape

      names.forEach(name => {
        shape.name = name
        const errors = modelNameValidation(shape, [shape])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/string/)
      })
    })

    test('checks if name is a alpha string', () => {
      const names: string[] = [
        '123name',
        'name123',
        '.name',
        'name.name',
        'name.',
        'name-name',
        'name_name',
        '-name',
        'name-',
        '$name',
        '&name',
        '(name)=',
        'name name name',
        'name\nname'
      ]

      const shape = {} as IShape

      names.forEach(name => {
        shape.name = name
        const errors = modelNameValidation(shape, [shape])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/a-z/)
      })
    })

    test('checks if name is reserved name', () => {
      const invalid: string[] = [
        systemShapes.asset,
        systemShapes.meta,
        systemShapes.user,
        systemShapes.asset.toLocaleLowerCase(),
        systemShapes.meta.toLocaleLowerCase(),
        systemShapes.asset.toLocaleLowerCase(),
        systemShapes.asset.toUpperCase(),
        systemShapes.meta.toUpperCase(),
        systemShapes.asset.toUpperCase()
      ]

      const shape = {} as IShape

      invalid.forEach(name => {
        shape.name = name
        const errors = modelNameValidation(shape, [shape])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/Reserved/)
      })

      const validNames = [
        systemShapes.asset + 'yooo',
        systemShapes.meta + 'uoi',
        'sadf' + systemShapes.user
      ]

      validNames.forEach(name => {
        shape.name = name
        const errors = modelNameValidation(shape, [shape])
        expect(errors).toHaveLength(0)
      })
    })
  })

  describe('dupeModelValidation', () => {
    test('checks for shape dupes', () => {
      const shape = { name: 'Author' } as IShape
      const modelList = [shape, { ...shape }]

      const errors = dupeModelValidation(shape, modelList)
      expect(errors).toHaveLength(1)
      expect(errors[0].error).toMatch(/unique/)
    })
  })

  describe('validateModels', () => {
    test('runs validations on all models in order', () => {
      const Author = new Shape('Author', {
        _name: { type: types.simpletext }
      })

      const Asset = new Shape(systemShapes.asset, {
        url: { type: types.simpletext, required: true }
      })

      const modelList = [Author, Asset]
      const errors = validateModels(modelList)

      expect(errors).toHaveLength(2)
      expect(errors[0].shape).toBe('Author')
      expect(errors[1].shape).toBe(systemShapes.asset)
    })
  })

  describe('schemaFieldValidation', () => {
    test('checks if name starts with a letter', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          ['_name']: {}
        }
      } as unknown) as IShape

      const errors = schemaFieldValidation(invalid, [invalid])
      const error = errors.find(e => /first char/i.test(e.error))
      expect(error).toBeTruthy()
    })

    test('checks if name is alpha numeric snake_case', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          ['first_name']: {},
          ['last4']: {}
        }
      } as unknown) as IShape

      const errors = schemaFieldValidation(invalid, [invalid])
      const error = errors.find(e => /alpha numeric snake_case/i.test(e.error))
      expect(error).not.toBeTruthy()
    })

    test('checks if field is a valid type', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          name: {
            type: 'int'
          }
        }
      } as unknown) as IShape

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /Invalid type/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.simpletext
          }
        }
      } as unknown) as IShape

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /Invalid type/i.test(e.error))
      expect(error).not.toBeTruthy()
    })

    test('checks if shape ref is a real shape', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.shape,
            ref: 'Post'
          }
        }
      } as unknown) as IShape

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /Shape "Post"/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.shape,
            ref: 'Post'
          }
        }
      } as unknown) as IShape

      const post = ({
        name: 'Post',
        modelType: types.shape,
        fields: {
          name: {
            type: types.simpletext
          }
        }
      } as unknown) as IShape

      errors = schemaFieldValidation(valid, [valid, post])
      error = errors.find(e => /Shape "Post"/i.test(e.error))
      expect(error).not.toBeTruthy()
    })

    test('checks if object type has nested object types', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: {}
              }
            }
          }
        }
      } as unknown) as IShape

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /cannot be an Object type/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: types.simpletext
              }
            }
          }
        }
      } as unknown) as IShape

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /cannot be an Object type/i.test(e.error))
      expect(error).not.toBeTruthy()
    })

    test('checks if object type has ref type', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: types.shape,
                ref: 'Post'
              }
            }
          }
        }
      } as unknown) as IShape

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /cannot be a shape ref/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: types.simpletext
              }
            }
          }
        }
      } as unknown) as IShape

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /cannot be a shape ref/i.test(e.error))
      expect(error).not.toBeTruthy()
    })
  })
})
