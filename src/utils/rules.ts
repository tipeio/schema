import { reservedNames, types } from './constants'
import { forEach, map, isString, isObject, some } from 'lodash'
import { SchemaType, IModel, IFields, IModelValidation } from '../types'

export const namesRegex = /^[a-z0-9-_ ]*$/i
export const apiIdRegex = /^[a-z][a-z_0-9]*$/i

export const reservedNameRegex = (names: { [key: string]: string }): RegExp => {
  const reservedModels = map(names, m => m).join('|')
  return new RegExp(`^(${reservedModels})$`, 'i')
}

export const notSystemShape = reservedNameRegex(reservedNames)
export const validAPIID = (v: any) => {
  return apiIdRegex.test(v) && !notSystemShape.test(v)
}

export const isPublicType = (type: SchemaType): boolean => {
  return !!Object.keys(types).find((k: string) => types[k] === type)
}

export const fieldsHasRefs = (fields: IFields): boolean =>
  some(fields, field => field.type === types.shape)

export const fieldsHaveListTypes = (fields: IFields): boolean =>
  some(fields, field => Boolean(field.array))

export const fieldsHaveNestedTypes = (fields: IFields): boolean =>
  some(fields, field => isObject(field.type))

export const validRef = function(
  this: any, // fake arg
  ref: string,
  shapes: IModel[]
): boolean {
  if (ref) {
    // ref must be a real shape
    if (some(shapes, shape => shape.apiId === ref && shape.type === 'page')) {
      throw new Error(`Invalid field. Ref cannot be of type Page`)
    }

    if (!some(shapes, shape => shape.apiId === ref)) {
      throw new Error(
        `Invalid field. Ref must be a real shape API ID, got "${ref}"`
      )
    }
  }

  return true
}

export const validateFieldType = (shape: IModel) => (
  type: SchemaType | IFields
): boolean => {
  if (!isString(type) && !isObject(type)) {
    throw new Error(`Invalid field type, got "${type}"`)
  }

  if (isString(type) && !isPublicType(type)) {
    throw new Error(`Invalid field type, got "${type}"`)
  }

  if (isObject(type)) {
    forEach(type as IFields, t => validateFieldType(shape)(t.type))
  }

  if (isObject(type) && fieldsHasRefs(type as IFields)) {
    throw new Error('Invalid field. Nested fields cannot have shape types')
  }

  if (isObject(type) && fieldsHaveNestedTypes(type as IFields)) {
    throw new Error(
      'Invalid field. Nested fields cannot have nested field types.'
    )
  }

  if (isObject(type) && fieldsHaveListTypes(type as IFields)) {
    throw new Error('Invalid field. Nested fields cannot have arrays.')
  }

  return true
}

export const checkForDupes = (models: IModel[]): IModelValidation[] => {
  const errors: IModelValidation[] = []

  models.forEach(model => {
    // need to check the entire array to collect all errors
    // to show devs. Hits must be greater than 1
    // to account for the current shape itself
    const apiIdMatch = models.filter(s => s.apiId === model.apiId).length > 1
    const nameMatch = models.filter(s => s.name === model.name).length > 1

    if (apiIdMatch) {
      errors.push({
        contentType: model.type,
        model: model.apiId,
        error: `Duplicate Shape API ID ${model.apiId}`,
        path: 'apiId'
      })
    }

    if (nameMatch) {
      errors.push({
        contentType: model.type,
        model: model.apiId,
        error: `Duplicate name ${model.name}`,
        path: 'name'
      })
    }
  })

  return errors
}
