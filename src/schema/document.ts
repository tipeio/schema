import { Schema } from './schema'
import { SchemaTypes } from './schema-types'

export class Document extends Schema {
  readonly schemaType = 'Document'

  constructor(name: string, types: SchemaTypes) {
    super(name, types)
  }
}
