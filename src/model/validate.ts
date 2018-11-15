import { ModelInterface, ModelValidator, ModelValidation } from './types'
import {isString} from 'lodash'

export const dupeModelValidation: ModelValidator = (model, models) => {
  const errors: ModelValidation[] = []
  const modelWithSameName = models.filter(m => m.name === model.name)

  if (modelWithSameName.length) {
    errors.push({
      model: model.name,
      error: `Model names must be unique. Name "${model.name}" is already used`
    })
  }

  return errors
}


export const modelNameValidation: ModelValidator = (model) => {
  const errors: ModelValidation[] = []
  
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
  
  if (!/^[a-z]+$/i.test(model.name)) {
    errors.push({
      model: model.name,
      error: `Invalid Model name "${model.name}. Only (a-zA-Z) allowed."`
    })
  }

  if (/asset|document|shape|page/i.test(model.name)) {
    errors.push({
      model: model.name,
      error: `Invalid Model name "${model.name}". Reserved name.`
    })
  }

  return errors
}

export const validateModels = (models: ModelInterface[]): ModelValidation[] => {
  return models.reduce((result, model) => {
    let errors = []
    
    errors.push(...modelNameValidation(model, models))
    errors.push(...dupeModelValidation(model, models))
    result.push(...errors)
    return result
  }, [] as ModelValidation[])
}