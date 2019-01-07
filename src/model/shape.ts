import { IFields, IShape } from '../types'
import { reduce, isObject, isString } from 'lodash'
export class Shape implements IShape {
  public fields: IFields
  public name: string
  public apiId: string

  constructor(apiId: string, nameOrFields: string | IFields, fields?: IFields) {
    this.apiId = apiId

    if (!isObject(nameOrFields)) {
      this.name = nameOrFields as string
      if (!fields) {
        throw new Error('Must provide fields')
      }
      this.fields = this.normalizeFields(fields)
    } else {
      this.name = apiId
      this.fields = this.normalizeFields(nameOrFields as IFields)
    }
  }

  public normalizeFields(fields: IFields): IFields {
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
          type:
            typeof field.type === 'object'
              ? this.normalizeFields(field.type)
              : field.type
        }
        return final
      },
      {} as IFields
    )
  }
}
