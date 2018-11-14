export type schemaTypeValue = 'string' | 'number'

export type UIConfig = {
  component?: string
  description?: string
}

export type ValidationsConfig = {
  required?: boolean
  minlength?: number
  maxlength?: number
  min?: number
  max?: number
}

export type SchemaType = {
  type: schemaTypeValue
  name: string
  ui?: UIConfig
  validations?: ValidationsConfig
}

export type SchemaTypes = {
  [name: string]: SchemaType | schemaTypeValue
}

export type TransformedSchemaTypes = {
  [name: string]: SchemaType
}

export type TransformedSchema = {
  name: string
  types: TransformedSchemaTypes
}
