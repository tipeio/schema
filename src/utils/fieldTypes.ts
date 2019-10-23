import { IFieldTypeCreator, IField, IFieldConfig, IFields } from '../types'
import { types } from './constants'

export const addMetaFields = (options: IField): IFieldConfig => ({
  options,
  name(name: string) {
    options.name = name
    return { ...this, options }
  },
  faker(faker: string) {
    options.faker = faker
    return { ...this, options }
  },
  description(desc: string) {
    options.description = desc
    return { ...this, options }
  }
})

export const createField = (options: IField): IFieldConfig => ({
  options,
  ...addMetaFields(options)
})

export const fieldTypes: IFieldTypeCreator = {
  object(config) {
    const fields: IFields = Object.keys(config).reduce(
      (result, f) => {
        result[f] = config[f].options
        return result
      },
      {} as IFields
    )

    return createField({
      type: fields
    })
  },
  ref(shape) {
    let ref = shape

    if (typeof shape !== 'string') {
      ref = shape.apiId
    }

    return createField({
      ref: ref as string,
      type: types.ref
    })
  },
  text() {
    return createField({
      type: types.text
    })
  },
  toggle() {
    return createField({
      type: types.toggle
    })
  },
  asset() {
    return createField({ type: types.asset })
  },
  code() {
    return createField({ type: types.code })
  },
  html() {
    return createField({ type: types.html })
  },
  button() {
    return createField({ type: types.button })
  },
  markdown() {
    return createField({ type: types.markdown })
  }
}
