import { Schema } from '../schema/types'
import { ModelInterface } from './types'

export abstract class Model implements ModelInterface {
  schema: Schema
  name: string

  constructor(name: string, schema: Schema) {
    this.schema = schema
    this.name = name
  }
}
