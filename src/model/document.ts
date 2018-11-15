import { Model } from './model'
import { Schema } from '../schema/types'

export class Document extends Model {
  readonly modelType = 'Document'

  constructor(name: string, schema: Schema) {
    super(name, schema)
  }
}
