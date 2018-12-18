import { IModel } from '../../types'
import { Page } from '../page'
import { types, models, components } from '../../utils'
import {
  modelNameValidation,
  dupeModelValidation,
  validateModels,
  schemaFieldValidation
} from '../validate'

describe('validate', () => {
  describe('modelNameValidation', () => {
    test('checks if name is given', () => {
      const model = {} as IModel
      const errors = modelNameValidation(model, [model])

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
      const model = {} as IModel

      names.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
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

      const model = {} as IModel

      names.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/a-z/)
      })
    })

    test('checks if name is reserved name', () => {
      const invalid: string[] = [
        models.asset,
        models.meta,
        models.user,
        models.asset.toLocaleLowerCase(),
        models.meta.toLocaleLowerCase(),
        models.asset.toLocaleLowerCase(),
        models.asset.toUpperCase(),
        models.meta.toUpperCase(),
        models.asset.toUpperCase()
      ]

      const model = {} as IModel

      invalid.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/Reserved/)
      })

      const validNames = [
        models.asset + 'yooo',
        models.meta + 'uoi',
        'sadf' + models.user
      ]

      validNames.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(0)
      })
    })
  })

  describe('dupeModelValidation', () => {
    test('checks for model dupes', () => {
      const model = { name: 'Author' } as IModel
      const modelList = [model, { ...model }]

      const errors = dupeModelValidation(model, modelList)
      expect(errors).toHaveLength(1)
      expect(errors[0].error).toMatch(/unique/)
    })
  })

  describe('validateModels', () => {
    test('runs validations on all models in order', () => {
      const Author = new Page('Author', {
        _name: { type: types.string }
      })

      const Asset = new Page(models.asset, {
        url: { type: types.string, required: true }
      })

      const modelList = [Author, Asset]
      const errors = validateModels(modelList)

      expect(errors).toHaveLength(2)
      expect(errors[0].model).toBe('Author')
      expect(errors[1].model).toBe(models.asset)
    })
  })

  describe('schemaFieldValidatio', () => {
    test('checks if name starts with a letter', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          ['_name']: {}
        }
      } as unknown) as IModel

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
      } as unknown) as IModel

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
      } as unknown) as IModel

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /Invalid type/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.string
          }
        }
      } as unknown) as IModel

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /Invalid type/i.test(e.error))
      expect(error).not.toBeTruthy()
    })

    test('checks if component is compatible with type', () => {
      const invalid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.string,
            component: components.toggle
          }
        }
      } as unknown) as IModel

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /compatible with component/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          name: {
            type: types.markdown,
            component: components.markdown
          }
        }
      } as unknown) as IModel

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /compatible with component/i.test(e.error))
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
      } as unknown) as IModel

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
      } as unknown) as IModel

      const post = ({
        name: 'Post',
        modelType: types.shape,
        fields: {
          name: {
            type: types.string
          }
        }
      } as unknown) as IModel

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
      } as unknown) as IModel

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /cannot be an Object type/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: types.string
              }
            }
          }
        }
      } as unknown) as IModel

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
      } as unknown) as IModel

      let errors = schemaFieldValidation(invalid, [invalid])
      let error = errors.find(e => /cannot be a shape ref/i.test(e.error))
      expect(error).toBeTruthy()

      const valid = ({
        name: 'Author',
        fields: {
          bio: {
            type: {
              address: {
                type: types.string
              }
            }
          }
        }
      } as unknown) as IModel

      errors = schemaFieldValidation(valid, [valid])
      error = errors.find(e => /cannot be a shape ref/i.test(e.error))
      expect(error).not.toBeTruthy()
    })
  })
})
