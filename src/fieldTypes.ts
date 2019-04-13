import { IFieldTypeCreator, IField, IFieldConfig, IFields } from './types'
import { types } from './utils/constants'

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
  // arrayOf() {},
  ref(shape) {
    let ref = shape

    if (typeof shape !== 'string') {
      ref = shape.apiId
    }

    return createField({
      ref: ref as string,
      type: types.shape
    })
  },
  text() {
    return createField({
      type: types.text
    })
  },
  richText() {
    return createField({
      type: types.richtext
    })
  },
  toggle() {
    return createField({
      type: types.toggle
    })
  },
  number() {
    return createField({ type: types.number })
  },
  calendar() {
    return createField({ type: types.calendar })
  },
  asset() {
    return createField({ type: types.asset })
  }
}
