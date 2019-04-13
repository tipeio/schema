import { reduce, isObject, isString } from 'lodash'
import { IFieldsConfigs, IFields, IField } from '../types'

export const setField = (field: IField, apiId: string) => ({
  ...field,
  apiId,
  name: field.name || apiId,
  type: isObject(field.type)
    ? reduce(
        field.type as IFields,
        (all: IFields, f, a) => {
          all[a] = f
          return all
        },
        {} as IFields
      )
    : field.type
})

export const normalizeFields = (fields: IFieldsConfigs): IFields => {
  return reduce(
    fields,
    (final, field, apiId) => {
      if (!isString(apiId)) {
        throw new Error('Field API ID must be a string')
      }

      final[apiId] = setField(field.options, apiId)
      return final
    },
    {} as IFields
  )
}
