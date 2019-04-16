import mongoose from 'mongoose/browser'
import { map, isString } from 'lodash'
import validator from 'validator'
import { types } from '../utils/constants'
import { IModel, IModelValidation } from '../types'
import {
  validateFieldType,
  validAPIID,
  validRef,
  notSystemShape,
  namesRegex,
  checkForDupes
} from '../utils/rules'

mongoose.Schema.Types.String.cast(false)

export const ModelFieldSchema = (model: IModel, models: IModel[]) => {
  const fields = {
    type: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      validate: {
        validator: validateFieldType(model),
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
          return validRef(ref, models)
        },
        message: (props: any) => props.reason.toString().replace('Error: ', '')
      }
    },
    description: String,
    faker: String
  }

  return new mongoose.Schema(fields, { _id: false })
}

export const ModelSchema = (model: IModel, models: IModel[]) => {
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
      of: ModelFieldSchema(model, models)
    }
  }

  if (model.type === 'page') {
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

export const validateOneModel = (
  model: IModel,
  models: IModel[]
): IModelValidation[] => {
  const doc = new mongoose.Document(model, ModelSchema(model, models))

  const res = doc.validateSync()
  const errors: IModelValidation[] = []

  if (res && res.errors) {
    errors.push(
      ...map(res.errors, (e, p) => ({
        contentType: model.type,
        model: model.apiId || '<Unknown>',
        error: `${e.message}`,
        path: p
      }))
    )
  }

  return errors
}

export const validateAllModels = (models: IModel[]) => {
  let errors: IModelValidation[] = []

  errors = errors.concat(
    ...models.map(m => validateOneModel(m, models)),
    ...checkForDupes(models)
  )
  return errors
}

export const validatePreviewUrl = (url: string) =>
  isString(url) && validator.isURL(url)
