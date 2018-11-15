import { Model } from './model'
import { Schema } from '../schema/types'

export class Page extends Model {
  readonly modelType = 'Page'

  constructor(name: string, schema: Schema) {
    super(name, schema)
  }
}
