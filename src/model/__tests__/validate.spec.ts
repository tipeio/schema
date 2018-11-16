import { modelNameValidation, dupeModelValidation, validateModels } from '../validate'
import { IModel } from '../../types'
import { Document } from '../document'
import { types } from '../../utils'

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
        'page',
        'Page',
        'PAGE',
        'asset',
        'Asset',
        'ASSET',
        'document',
        'Document',
        'DOCUMENT',
        'shape',
        'Shape',
        'SHAPE'
      ]

      const model = {} as IModel

      invalid.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/Reserved/)
      })

      const validNames = [
        'HomePage',
        'VideoAsset',
        'DocumentThing'
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
      const models = [model, { ...model }]

      const errors = dupeModelValidation(model, models)
      expect(errors).toHaveLength(1)
      expect(errors[0].error).toMatch(/unique/)
    })
  })

  describe('validateModels', () => {
    test('runs validations on all models in order', () => {
      const Author = new Document('Author', {
        _name: {type: types.string}
      })

      const Asset = new Document('Asset', {
        url: {type: types.string, required: true}
      })

      const models = [Author, Asset]
      const errors = validateModels(models)

      expect(errors).toHaveLength(2)
      expect(errors[0].model).toBe('Author')
      expect(errors[1].model).toBe('Asset')
    })
  })
})
