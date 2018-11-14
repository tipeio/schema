import { Schema } from './schema'
import { SchemaTypes } from './schema-types'

export class Page extends Schema {
  readonly schemaType = 'Page'

  constructor(name: string, types: SchemaTypes) {
    super(name, types)
  }
}
