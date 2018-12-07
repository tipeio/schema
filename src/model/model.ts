import { IFields, IModel } from '../types'
import { reduce } from 'lodash'
import { defaultComponents } from '../utils/constants'
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
          displayName: field.displayName || name,
          required: Boolean(field.required),
          array: Boolean(field.array),
          component: field.component || defaultComponents[field.type as string],
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
