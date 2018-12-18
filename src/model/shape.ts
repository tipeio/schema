import { IFields, IShape } from '../types'
import { reduce } from 'lodash'
export class Shape implements IShape {
  public fields: IFields
  public name: string
  public apiId: string

  constructor(apiId: string, nameOrFields: string | IFields, fields?: IFields) {
    this.apiId = apiId

    if (typeof nameOrFields === 'string') {
      this.name = nameOrFields
      if (!fields) {
        throw new Error('Must provide fields')
      }
      this.fields = this.normalizeFields(fields)
    } else {
      this.name = apiId
      this.fields = this.normalizeFields(nameOrFields)
    }
  }

  public normalizeFields(fields: IFields): IFields {
    return reduce(
      fields,
      (final, field, apiId) => {
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
