export type SchemaTypeFinal = {
  type: SchemaType
  required: boolean
  array: boolean
  component: Component | RefComponent
  ref?: string
  default?: any
  description?: string
}

export type SchemaTypeConfig = {
  type: SchemaType
  ref?: string
  component?: Component
  description?: string
  required?: boolean
  isList?: boolean
  default?: any
}

export interface SchemaTypeFunction {
  (config: SchemaTypeConfig): SchemaTypeFinal
}

export type Schema = {
  [fieldName: string]: SchemaTypeFinal
}

export type TypeMap = {
  [type: string]: SchemaType
}

export type ValidComponentsMap = {
  [type: string]: EveryComponent[]
}

export type ComponentsMap = {
  [type: string]: EveryComponent
}

export type Component = 'markdown' | 'simpletext' | 'calendar' | 'range' | 'color' | 'toggle'
export type RefComponent = 'asset' | 'document' | 'shape'
export type Components = {
  [name: string]: Component | RefComponent
}
export type EveryComponent = Component | RefComponent
export type SchemaType = StringType | NumberType | BooleanType | DateType | ShapeType | DocumentType
export type StringType = string
export type DateType = string
export type BooleanType = string
export type NumberType = string
export type ShapeType = string
export type DocumentType = string
export type AssetType = string
