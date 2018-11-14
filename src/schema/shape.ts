import { Schema } from './schema'
import { SchemaTypes } from './schema-types'

export class Shape extends Schema {
  readonly schemaType = 'Shape'

  constructor(name: string, types: SchemaTypes) {
    super(name, types)
  }
}
