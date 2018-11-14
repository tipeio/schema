import { SchemaFields } from '../schema-types/types'
export class Schema {
  types: SchemaFields
  name: string

  constructor(name: string, types: SchemaFields) {
    this.types = types
    this.name = name
  }
}
