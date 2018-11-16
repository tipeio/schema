import { field } from './schema/field'
export interface IFieldNormalized {
  type: SchemaType
  required: boolean
  array: boolean
  component: Component | RefComponent
  displayName?: string
  ref?: string
  default?: any
  description?: string
}

export interface IUserFieldConfig {
  type: SchemaType
  displayName?: string
  ref?: string
  component?: Component
  description?: string
  required?: boolean
  isList?: boolean
  default?: any
}

export type SchemaTypeFunction = (config: IUserFieldConfig) => IFieldNormalized

export interface IFields {
  [fieldName: string]: IFieldNormalized
}
export interface IUserSchema {
  [fieldName: string]: IUserFieldConfig
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
  | StringType
  | NumberType
  | BooleanType
  | DateType
  | ShapeType
  | DocumentType
export type StringType = string
export type DateType = string
export type BooleanType = string
export type NumberType = string
export type ShapeType = string
export type DocumentType = string
export type AssetType = string

export interface IModel {
  fields: IFields
  name: string
}
export interface IModelValidation {
  model: string
  error: string
}

export type ModelValidator = (model: IModel, models: IModel[]) => IModelValidation[]

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
  page: 'Page'
}
