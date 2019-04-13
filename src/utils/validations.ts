import mongoose from 'mongoose/browser'
import { map } from 'lodash'
import { types } from '../utils/constants'
import { IModel, IShape, IShapeValidation } from '../types'
import {
  validateFieldType,
  validAPIID,
  validRef,
  notSystemShape,
  namesRegex,
  checkForDupes
} from '../utils/rules'

mongoose.Schema.Types.String.cast(false)

export const ShapeFieldsSchema = (shape: IModel, shapes: IModel[]) => {
  const fields = {
    type: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: validateFieldType(shape),
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
    array: {
      type: Boolean,
      required: true,
      default: false
    },
    ref: {
      type: String,
      required() {
        return ((this.type as unknown) as string) === types.shape
      },
      validate: {
        validator(ref: string) {
          return validRef(ref, shapes)
        },
        message: (props: any) => props.reason.toString().replace('Error: ', '')
      }
    },
    description: String,
    faker: String
  }

  return new mongoose.Schema(fields, { _id: false })
}

export const ShapeSchema = (shape: IModel, shapes: IModel[]) => {
  let fields = {
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

    multi: {
      type: Boolean,
      required: true
    },

    fields: {
      type: Map,
      of: ShapeFieldsSchema(shape, shapes)
    }
  }

  if (shape.type === 'page') {
    fields = {
      ...fields,
      route: {
        type: String,
        required: true
      },
      routeParams: [
        {
          type: String
        }
      ]
    } as any
  }

  return new mongoose.Schema(fields, { _id: false })
}

export const validateShape = (
  shape: IModel,
  shapes: IModel[]
): IShapeValidation[] => {
  const doc = new mongoose.Document(shape, ShapeSchema(shape, shapes))

  const res = doc.validateSync()
  const errors: IShapeValidation[] = []

  if (res && res.errors) {
    errors.push(
      ...map(res.errors, (e, p) => ({
        shape: shape.apiId || '<Unknown>',
        error: `${e.message}`,
        path: p
      }))
    )
  }

  return errors
}

export const validateShapes = (shapes: IModel[]) => {
  let errors: IShapeValidation[] = []

  errors = errors.concat(
    ...shapes.map(s => validateShape(s, shapes)),
    ...checkForDupes(shapes)
  )
  return errors
}
