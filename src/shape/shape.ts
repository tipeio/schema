import { IFields, IShape } from '../types'
import { reduce, isObject, isString } from 'lodash'
import { normalizeFields } from '../utils/normalize-fields'
export class Shape implements IShape {
  public type = 'shape'
  public fields: IFields
  public name: string
  public apiId: string

  constructor(apiId: string, nameOrFields: string | IFields, fields?: IFields) {
    if (!isString(apiId)) {
      throw new Error('Shape API ID must be string')
    }

    this.apiId = apiId

    // Any non object will be treated as a string, not converted, and passed
    // to mongoose for validations where it may or may not pass.
    // Objects need to be formatted
    if (!isObject(nameOrFields)) {
      this.name = nameOrFields as string
      if (!fields) {
        throw new Error('Must provide fields')
      }
      this.fields = normalizeFields(fields)
    } else {
      this.name = apiId
      this.fields = normalizeFields(nameOrFields as IFields)
    }
  }
}
