import { IFields, IModel } from '../types'
import { reduce } from 'lodash'
export abstract class Model implements IModel {
  public fields: IFields
  public name: string
  public modelType: string = ''

  constructor(name: string, fields: IFields) {
    this.fields = this.normalizeFields(fields)
    this.name = name
  }

  public normalizeFields(fields: IFields): IFields {
    return reduce(
      fields,
      (final, field, name) => {
        final[name] = {
          ...field,
          name,
          displayName: name || field.displayName,
          required: Boolean(field.required),
          array: Boolean(field.array)
        }
        return final
      },
      {} as IFields
    )
  }
}
