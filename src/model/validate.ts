import { IModel, ModelValidator, IModelValidation } from '../types'
import { models, fields } from '../utils'
import { isString, map } from 'lodash'

export const normalizeFieldName = (name: string): string => {
  return name.toLocaleLowerCase()
}

export const reservedNameRegex = (names: {[key: string]: string}): RegExp => {
  const reservedModels = map(names, m => m).join('|')
  return new RegExp(`^(${reservedModels})$`, 'i')
}

export const schemaFieldNameValidation: ModelValidator = (model) => {
  const modelFields = Object.keys(model.fields)
  const errors: IModelValidation[] = []
  
  modelFields.forEach(field => {
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

export const dupeModelValidation: ModelValidator = (model, modelList) => {
  const errors: IModelValidation[] = []
  const modelWithSameName = modelList.filter(m => m.name === model.name)
  
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
  
  
  const reg = reservedNameRegex(models)
  if (reg.test(model.name)) {
    errors.push({
      model: model.name,
      error: `Invalid Model name "${model.name}". Reserved name.`
    })
  }

  return errors
}

export const validateModels = (modelList: IModel[]): IModelValidation[] => {
  return modelList.reduce(
    (result, model) => {
      const errors = []

      errors.push(...modelNameValidation(model, modelList))
      errors.push(...dupeModelValidation(model, modelList))
      errors.push(...schemaFieldNameValidation(model, modelList))
      result.push(...errors)
      return result
    },
    [] as IModelValidation[]
  )
}
