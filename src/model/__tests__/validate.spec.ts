import { modelNameValidation, dupeModelValidation } from '../validate'
import { IModelInterface } from '../types'

describe('validate', () => {
  describe('modelNameValidation', () => {
    test('checks if name is given', () => {
      const model = {} as IModelInterface
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
      const model = {} as IModelInterface

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

      const model = {} as IModelInterface

      names.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/a-z/)
      })
    })

    test('checks if name is reserved name', () => {
      const names: string[] = [
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

      const model = {} as IModelInterface

      names.forEach(name => {
        model.name = name
        const errors = modelNameValidation(model, [model])
        expect(errors).toHaveLength(1)
        expect(errors[0].error).toMatch(/Reserved/)
      })
    })
  })

  describe('dupeModelValidation', () => {
    test('checks for model dupes', () => {
      const model = { name: 'Author' } as IModelInterface
      const models = [model, { ...model }]

      const errors = dupeModelValidation(model, models)
      expect(errors).toHaveLength(1)
      expect(errors[0].error).toMatch(/unique/)
    })
  })
})
