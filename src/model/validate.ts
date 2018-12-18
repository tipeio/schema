import { isString, map, filter, reduce } from 'lodash'
import {
  IShape,
  ShapeValidator,
  IShapeValidation,
  SchemaType,
  IFields
} from '../types'
import { systemShapes, types } from '../utils'

export const isPublicType = (type: SchemaType): boolean => {
  if (type === types.asset) {
    return false
  }

  return !!Object.keys(types).find((k: string) => types[k] === type)
}

export const normalizeFieldName = (name: string): string => {
  return name.toLocaleLowerCase()
}

export const reservedNameRegex = (names: { [key: string]: string }): RegExp => {
  const reservedModels = map(names, m => m).join('|')
  return new RegExp(`^(${reservedModels})$`, 'i')
}

export const isNestedObject = (fields: IFields): boolean => {
  const results = filter(fields, field => {
    return typeof field.type !== 'string'
  })

  return !!results.length
}

export const schemaFieldValidation: ShapeValidator = (shape, shapes) => {
  const shapeFields = Object.keys(shape.fields)
  const errors: IShapeValidation[] = []

  shapeFields.forEach(fieldName => {
    const field = shape.fields[fieldName]

    // must start with a letter
    if (!/^[a-z]/i.test(fieldName[0])) {
      errors.push({
        shape: shape.apiId,
        error: `Invalid field "${fieldName}". First char must be a letter`
      })
    }

    // supports_snake_case
    if (!/^[a-z_0-9]*$/i.test(fieldName)) {
      errors.push({
        shape: shape.apiId,
        error: `Invalid field "${fieldName}". Only alpha numeric snake_case allowed`
      })
    }

    if (typeof field.type === 'string') {
      if (!isPublicType(field.type)) {
        errors.push({
          shape: shape.apiId,
          error: `Invalid field "${fieldName}". Invalid type "${field.type}"`
        })
      }

      if (
        field.type === types.shape &&
        !shapes.find(m => m.name === field.ref)
      ) {
        errors.push({
          shape: shape.apiId,
          error: `Invalid field "${fieldName}". Shape "${
            field.ref
          }" does not exist`
        })
      }
    } else {
      // objet type
      const nestedErrors = reduce(
        field.type,
        (mem, subfield, subfieldName) => {
          if (typeof subfield.type === 'string') {
            if (!isPublicType(subfield.type)) {
              errors.push({
                shape: shape.apiId,
                error: `Invalid field "${fieldName}.${subfieldName}". Invalid type "${
                  subfield.type
                }"`
              })
            }

            if (subfield.type === types.shape) {
              mem.push({
                shape: shape.apiId,
                error: `Invalid field "${fieldName}.${subfieldName}". Object type field cannot be a shape ref`
              })
            }
          } else {
            mem.push({
              shape: shape.apiId,
              error: `Invalid field "${fieldName}.${subfieldName}". Object types field cannot be an Object type`
            })
          }

          return mem
        },
        [] as IShapeValidation[]
      )

      errors.push(...nestedErrors)
    }
  })

  return errors
}

export const dupeModelValidation: ShapeValidator = (shape, shapes) => {
  const errors: IShapeValidation[] = []
  const matchingShapes = shapes.filter(
    m => m.name === shape.name || m.apiId === shape.apiId
  )

  // account for the same shape in the list of models
  if (matchingShapes.length > 1) {
    errors.push({
      shape: shape.apiId,
      error: `Shape names and API IDs must be unique. Name "${
        shape.name
      }" or "${shape.apiId}" is already used by another shape`
    })
  }

  return errors
}

export const modelNameValidation: ShapeValidator = shape => {
  const errors: IShapeValidation[] = []

  if (!shape.name) {
    errors.push({
      shape: shape.apiId,
      error: 'Invalid Shape name. Cannot be empty'
    })

    return errors
  }

  if (!isString(shape.name)) {
    errors.push({
      shape: shape.apiId,
      error: 'Invalid Shape name. Must be a string'
    })

    return errors
  }

  // alpha only
  if (!/^[a-z]+$/i.test(shape.name)) {
    errors.push({
      shape: shape.apiId,
      error: `Invalid Shape name "${shape.name}. Only (a-zA-Z) allowed."`
    })
  }

  const reg = reservedNameRegex(systemShapes)
  if (reg.test(shape.name)) {
    errors.push({
      shape: shape.apiId,
      error: `Invalid Shape name "${shape.name}". Reserved name.`
    })
  }

  return errors
}

export const validateModels = (shapes: IShape[]): IShapeValidation[] => {
  return shapes.reduce(
    (result, shape) => {
      const errors = []

      errors.push(...modelNameValidation(shape, shapes))
      errors.push(...dupeModelValidation(shape, shapes))
      errors.push(...schemaFieldValidation(shape, shapes))
      result.push(...errors)
      return result
    },
    [] as IShapeValidation[]
  )
}
