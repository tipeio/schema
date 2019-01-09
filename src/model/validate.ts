import mongoose from 'mongoose/browser'
import { systemShapes } from '../utils'
import { forEach, map, isString, isObject, some } from 'lodash'
import { types } from '../utils/constants'
import { SchemaType, IShape, IFields, IShapeValidation } from '../types'

mongoose.Schema.Types.String.cast(false)

const namesRegex = /^[a-z0-9-_ ]*$/i
const apiIdRegex = /^[a-z][a-z_0-9]*$/i

export const reservedNameRegex = (names: { [key: string]: string }): RegExp => {
  const reservedModels = map(names, m => m).join('|')
  return new RegExp(`^(${reservedModels})$`, 'i')
}

const notSystemShape = reservedNameRegex(systemShapes)
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

const validateFieldType = (type: SchemaType | IFields): boolean => {
  if (!isString(type) && !isObject(type)) {
    throw new Error(`Invalid field type, got "${type}"`)
  }

  if (isString(type) && !isPublicType(type)) {
    throw new Error(`Invalid field type, got "${type}"`)
  }

  if (isObject(type)) {
    forEach(type as IFields, t => validateFieldType(t.type))
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

export const ShapeFieldsSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: validateFieldType,
        message: (props: any) => props.reason.toString().replace('Error: ', '')
      }
    },
    apiId: {
      type: String,
      required: true,
      validate: {
        validator: validAPIID,
        message: () => 'Invalid field API ID'
      }
    },
    name: {
      type: String,
      required: true,
      maxlength: 20,
      match: namesRegex
    },
    required: {
      type: Boolean,
      required: true,
      default: false
    },
    array: {
      type: Boolean,
      required: true,
      default: false
    },
    ref: String,
    description: String,
    faker: String
  },
  { _id: false }
)

export const ShapeSchema = new mongoose.Schema(
  {
    apiId: {
      type: String,
      required: true,
      validate: {
        validator: validAPIID,
        message(props: { [key: string]: any }) {
          return `Invalid Shape API ID. Got ${props.value}`
        }
      }
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (v: any) => !notSystemShape.test(v) && namesRegex.test(v),
        message(props: { [key: string]: any }) {
          return `Invalid Shape name. Got ${props.value}`
        }
      }
    },
    fields: {
      type: Map,
      of: ShapeFieldsSchema
    }
  },
  { _id: false }
)

export const checkForDupes = (shapes: IShape[]): IShapeValidation[] => {
  const errors: IShapeValidation[] = []

  shapes.forEach(shape => {
    // need to check the entire array to collect all errors
    // to show devs. Hits must be greater than 1
    // to account for the current shape itself
    const apiIdMatch = shapes.filter(s => s.apiId === shape.apiId).length > 1
    const nameMatch = shapes.filter(s => s.name === shape.name).length > 1

    if (apiIdMatch) {
      errors.push({
        shape: shape.apiId,
        error: `Duplicate Shape API ID ${shape.apiId}`,
        path: 'apiId'
      })
    }

    if (nameMatch) {
      errors.push({
        shape: shape.apiId,
        error: `Duplicate Shape name ${shape.name}`,
        path: 'name'
      })
    }
  })

  return errors
}

export const validateShape = (shape: IShape): IShapeValidation[] => {
  const doc = new mongoose.Document(shape, ShapeSchema)

  const res = doc.validateSync()
  const errors: IShapeValidation[] = []

  if (res && res.errors) {
    errors.push(
      ...map(res.errors, (e, p) => ({
        shape: shape.apiId,
        error: `${e.message}`,
        path: p
      }))
    )
  }

  return errors
}

export const validateShapes = (shapes: IShape[]) => {
  let errors: IShapeValidation[] = []

  errors = errors.concat(...shapes.map(validateShape), ...checkForDupes(shapes))
  return errors
}
