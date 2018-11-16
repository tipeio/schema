import { modelNameValidation, dupeModelValidation, validateModels, schemaFieldNameValidation } from '../validate'
import { IModel } from '../../types'
import { Document } from '../document'
import { types, models, fields } from '../../utils'

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
        models.asset.toUpperCase(),
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
      const Author = new Document('Author', {
        _name: {type: types.string}
      })

      const Asset = new Document(models.asset, {
        url: {type: types.string, required: true}
      })

      const modelList = [Author, Asset]
      const errors = validateModels(modelList)

      expect(errors).toHaveLength(2)
      expect(errors[0].model).toBe('Author')
      expect(errors[1].model).toBe(models.asset)
    })
  })

  describe('schemaFieldValidatio', () => {
    test('checks if name a string', () => {
      const invalid = {
        fields: {
          [123]: {}
        }
      } as unknown as IModel
      
      const errors = schemaFieldNameValidation(invalid, [invalid])
      expect(errors).toHaveLength(2)
    })
  })
})
