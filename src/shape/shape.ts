import { IFields, IShape, IShapeOptions } from '../types'
import { isString } from 'lodash'
import { normalizeFields } from '../utils/normalize-fields'

export class Shape implements IShape {
  public type = 'shape'
  public fields: IFields
  public name: string
  public apiId: string
  public multi: boolean

  constructor(options: IShapeOptions) {
    if (!isString(options)) {
      throw new Error('Shape API ID must be a string')
    }

    this.apiId = options.apiId
    this.name = options.name || options.apiId
    this.fields = normalizeFields(options.fields)
    this.multi = options.multi || true
  }
}
