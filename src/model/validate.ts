import { IModel, ModelValidator, IModelValidation } from '../types'
import { isString } from 'lodash'

export const normalizeFieldName = (name: string): string => {
  return name.toLocaleLowerCase()
}

export const schemaFieldNameValidation: ModelValidator = (model) => {
  const fields = Object.keys(model.fields)
  const errors: IModelValidation[] = []
  
  fields.forEach(field => {
    if (!isString(field)) {
      errors.push({
        model: model.name,
        error: `Invalid field "${field}". Must be a string`
      })
    }
    
    // must start with a letter
    if (!/^[a-z]/i.test(field[0])) {
      errors.push({
        model: model.name,
        error: `Invalid field "${field}". First char must be a letter`
      })
    }
  
    // supports_snake_case
    if (!/^[a-z_]*$/i.test(field)) {
      errors.push({
        model: model.name,
        error: `Invalid field "${field}". Only (a-zA-Z) allowed`
      })
    }
  })
  return errors
}

export const dupeModelValidation: ModelValidator = (model, models) => {
  const errors: IModelValidation[] = []
  const modelWithSameName = models.filter(m => m.name === model.name)
  
  // account for the same model in the list of models
  if (modelWithSameName.length > 1) {
    errors.push({
      model: model.name,
      error: `Model names must be unique. Name "${model.name}" is already used`
    })
  }

  return errors
}

export const modelNameValidation: ModelValidator = model => {
  const errors: IModelValidation[] = []

  if (!model.name) {
    errors.push({
      model: model.name,
      error: 'Invalid Model name. Cannot be empty'
    })

    return errors
  }

  if (!isString(model.name)) {
    errors.push({
      model: `${model.name}`,
      error: 'Invalid Model name. Must be a string'
    })

    return errors
  }
  
  // alpha only
  if (!/^[a-z]+$/i.test(model.name)) {
    errors.push({
      model: model.name,
      error: `Invalid Model name "${model.name}. Only (a-zA-Z) allowed."`
    })
  }
  
  // can use these names, just not alone
  if (/^(asset|document|shape|page)$/i.test(model.name)) {
    errors.push({
      model: model.name,
      error: `Invalid Model name "${model.name}". Reserved name.`
    })
  }

  return errors
}

export const validateModels = (models: IModel[]): IModelValidation[] => {
  return models.reduce(
    (result, model) => {
      const errors = []

      errors.push(...modelNameValidation(model, models))
      errors.push(...dupeModelValidation(model, models))
      errors.push(...schemaFieldNameValidation(model, models))
      result.push(...errors)
      return result
    },
    [] as IModelValidation[]
  )
}
