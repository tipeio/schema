import { Model } from './model'
import { Schema } from '../schema-types/types'

export class Shape extends Model {
  readonly modelType = 'Shape'

  constructor(name: string, schema: Schema) {
    super(name, schema)
  }
}
