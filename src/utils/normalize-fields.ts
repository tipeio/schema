import { reduce, isObject, isString } from 'lodash'
import { IFields } from '../types'

export const normalizeFields = (fields: IFields): IFields => {
  return reduce(
    fields,
    (final, field, apiId) => {
      if (!isString(apiId)) {
        throw new Error('Field API ID must be a string')
      }

      final[apiId] = {
        ...field,
        apiId,
        name: field.name || apiId,
        required: Boolean(field.required),
        array: Boolean(field.array),
        type: isObject(field.type)
          ? normalizeFields(field.type as IFields)
          : field.type
      }
      return final
    },
    {} as IFields
  )
}
