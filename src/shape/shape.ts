import { IShape, IShapeOptions, IFieldsConfigs, IFields } from '../types'
import { normalizeFields } from '../utils/normalize-fields'

export class Shape implements IShape {
  public type = 'shape'
  public fields: IFields
  public name: string
  public apiId: string
  public multi: boolean

  constructor(options: IShapeOptions) {
    this.apiId = options.apiId
    this.name = options.name || options.apiId
    this.fields = normalizeFields(options.fields)
    this.multi = options.multi || true
  }
}
