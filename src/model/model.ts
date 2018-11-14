import { Schema } from '../schema-types/types'
export abstract class Model {
  schema: Schema
  name: string

  constructor(name: string, schema: Schema) {
    this.schema = schema
    this.name = name
  }
}
