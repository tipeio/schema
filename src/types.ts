export interface IField {
  type: SchemaType | IFields
  name?: string
  required?: boolean
  array?: boolean
  component?: Component | SystemComponent
  displayName?: string
  ref?: string
  default?: any
  description?: string
  faker?: string
}

export interface IFields {
  [fieldName: string]: IField
}
export interface ITypeMap {
  [type: string]: SchemaType
}

export interface IValidComponentsMap {
  [type: string]: string[]
}

export interface IComponentsMap {
  markdown: string
  simpletext: string
  calendar: string
  numberselect: string
  toggle: string
  shape: string
}

export type Component =
  | 'markdown'
  | 'simpletext'
  | 'calendar'
  | 'numberselect'
  | 'range'
  | 'color'
  | 'toggle'

export type SystemComponent = 'asset' | 'shape'
export interface IComponents {
  [name: string]: Component | SystemComponent
}
export type EveryComponent = Component | SystemComponent
export type SchemaType =
  | 'String'
  | 'Date'
  | 'Boolean'
  | 'Number'
  | 'Markdown'
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
  markdown: 'Markdown'
  document: 'Document'
  shape: 'Shape'
}
