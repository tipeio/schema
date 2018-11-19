export interface IField {
  type: SchemaType | IFields
  name?: string
  required?: boolean
  array?: boolean
  component?: Component | RefComponent
  displayName?: string
  ref?: string
  default?: any
  description?: string
}

export interface IFields {
  [fieldName: string]: IField
}
export interface ITypeMap {
  [type: string]: SchemaType
}

export interface IValidComponentsMap {
  [type: string]: EveryComponent[]
}

export interface IComponentsMap {
  [type: string]: EveryComponent
}

export type Component =
  | 'markdown'
  | 'simpletext'
  | 'calendar'
  | 'range'
  | 'color'
  | 'toggle'

export type RefComponent = 'asset' | 'document' | 'shape'
export interface IComponents {
  [name: string]: Component | RefComponent
}
export type EveryComponent = Component | RefComponent
export type SchemaType =
  | 'String'
  | 'Date'
  | 'Boolean'
  | 'Number'
  | 'Shape'
  | 'Document'

export interface IModel {
  fields: IFields
  name: string
  modelType: string
  normalizeFields(fields: IFields): IFields
}
export interface IModelValidation {
  model: string
  error: string
}

export type ModelValidator = (
  model: IModel,
  models: IModel[]
) => IModelValidation[]

export interface IPreparedSchema {
  errors: IModelValidation[]
  models: IModel[]
}

export interface ITypes {
  string: 'String'
  number: 'Number'
  boolean: 'Boolean'
  date: 'Date'
  document: 'Document'
  shape: 'Shape'
}
