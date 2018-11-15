import { Model } from './model'
import { ISchema } from '../schema/types'

export class Shape extends Model {
  public readonly modelType = 'Shape'

  constructor(name: string, schema: ISchema) {
    super(name, schema)
  }
}
