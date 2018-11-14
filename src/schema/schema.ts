import { SchemaTypes, TransformedSchema, TransformedSchemaTypes, SchemaType } from './schema-types'
import _ from 'lodash'

export const transformSchema = (types: SchemaTypes): TransformedSchemaTypes => {
  return _.reduce(types, (m, type , name: string) => {
    let finalType = (type as SchemaType)

    if (!finalType.type) {
      finalType = {type: finalType.type, name}
    }

    m[name] = finalType
    return m
  }, {} as TransformedSchemaTypes)
}

export class Schema {
  types: SchemaTypes
  name: string

  constructor(name: string, types: SchemaTypes) {
    this.types = types
    this.name = name
  }

  transform(): TransformedSchema {
    return {
      name: this.name,
      types: transformSchema(this.types)
    }
  }
}
