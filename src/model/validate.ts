/**
 * All the validations for the models and fields
 * Model Validations
 *   - names must be strings
 *   - cannout use reserved names
 *   - cannot have numbers in the name
 *   - must be unique
 *   - must have fields
 *
 * Field Validations
 *   - names must be strings
 *   - names must start with alpha char
 *   - names can only be snake case
 *   - shape types cannot ref other shape types
 *   - object types cannot have fields that are object types
 *   - object types cannot have fields that ref shape types
 */

import {
  IModel,
  ModelValidator,
  IModelValidation,
  SchemaType,
  IFields,
  EveryComponent
} from '../types'
import {
  models,
  types,
  validUserTypes,
  validComponentsForTypes
} from '../utils'
import { isString, map, filter } from 'lodash'

export const normalizeFieldName = (name: string): string => {
  return name.toLocaleLowerCase()
}

export const reservedNameRegex = (names: { [key: string]: string }): RegExp => {
  const reservedModels = map(names, m => m).join('|')
  return new RegExp(`^(${reservedModels})$`, 'i')
}

export const isValidType = (type: SchemaType): boolean => {
  return type in validUserTypes
}

export const isNestedObject = (fields: IFields): boolean => {
  return !!filter(fields, field => {
    return typeof field.type !== 'string'
  }).length
}

export const isValidComponentForType = (
  fieldType: string,
  component: string = ''
): boolean => {
  const components = validComponentsForTypes[fieldType] || []

  if (!components.length) {
    return false
  }

  return Boolean(components.find((c: EveryComponent) => c === component))
}

export const schemaFieldValidation: ModelValidator = (model, modelList) => {
  const modelFields = Object.keys(model.fields)
  const errors: IModelValidation[] = []

  modelFields.forEach(fieldName => {
    const field = model.fields[fieldName]

    // must start with a letter
    if (!/^[a-z]/i.test(fieldName[0])) {
      errors.push({
        model: model.name,
        error: `Invalid field "${fieldName}". First char must be a letter`
      })
    }

    // supports_snake_case
    if (!/^[a-z_0-9]*$/i.test(fieldName)) {
      errors.push({
        model: model.name,
        error: `Invalid field "${fieldName}". Only alpha numeric snake_case allowed`
      })
    }

    if (typeof field.type === 'string') {
      if (!isValidType(field.type)) {
        errors.push({
          model: model.name,
          error: `Invalid field "${fieldName}". Invalid type "${field.type}"`
        })
      }

      if (!isValidComponentForType(field.type, field.component)) {
        errors.push({
          model: model.name,
          error: `Invalid field "${fieldName}". Type "${
            field.type
          }" is not compatible with component "${field.component}"`
        })
      }

      if (
        field.type === types.shape &&
        !modelList.find(m => m.name === field.ref)
      ) {
        errors.push({
          model: model.name,
          error: `Invalid field "${fieldName}. Shape "${
            field.ref
          } was not created"`
        })
      }

      if (field.type === types.shape && model.modelType === types.shape) {
        errors.push({
          model: model.name,
          error: `Invalid field "${fieldName}". Shapes cannot reference other shapes"`
        })
      }
    } else {
      // objet type
      if (isNestedObject(field.type)) {
        errors.push({
          model: model.name,
          error: `Invalid field "${fieldName}". Object types cannot have fields with Object types`
        })
      }
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
      errors.push(...schemaFieldValidation(model, modelList))
      result.push(...errors)
      return result
    },
    [] as IModelValidation[]
  )
}
