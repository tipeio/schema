import { SchemaType } from './types'

export interface IField {
  type: SchemaType | IFields
  apiId?: string
  name?: string
  array?: boolean
  ref?: string
  description?: string
  faker?: string
}

export interface IFields {
  [fieldName: string]: IField
}

export interface IFieldsConfigs {
  [fieldName: string]: IFieldConfig
}

export interface IModelFieldTypes {
  richtext: 'RichText'
  text: 'Text'
  calendar: 'Calendar'
  number: 'Number'
  toggle: 'Toggle'
  asset: 'Asset'
  shape: 'Shape'
  [type: string]: string
}

export interface IModelTypes {
  shape: 'shape'
  page: 'page'
}

export interface IValidComponentsMap {
  [type: string]: string[]
}

export type SchemaType =
  | string
  | 'RichText'
  | 'Text'
  | 'Calendar'
  | 'Number'
  | 'Toggle'
  | 'Asset'
  | 'Shape'

export type IModel = IShape | IPage

export interface IShape {
  type: string
  fields: IFields
  apiId: string
  name: string
  route?: string
  multi: boolean
}

export interface IPage {
  type: string
  fields: IFields
  apiId: string
  name: string
  route: string
  routeParams: string[]
  multi: boolean
}

export interface IModelValidation {
  contentType: string
  model: string
  error: string
  path?: string
}

export interface IPageOptions {
  fields: IFieldsConfigs
  apiId: string
  name: string
  route: string
}

export interface IShapeOptions {
  fields: IFieldsConfigs
  apiId: string
  name: string
  multi?: boolean
}

export interface IFieldConfig extends IFieldMeta {
  options: IField
}

export interface IFieldTypeCreator {
  object(config: IFieldsConfigs): IFieldConfig
  ref(shape: IShape | string): IFieldConfig
  text(): IFieldConfig
  richText(): IFieldConfig
  toggle(): IFieldConfig
  number(): IFieldConfig
  calendar(): IFieldConfig
  asset(): IFieldConfig
}

export interface IFieldMeta {
  name(name: string): IFieldConfig
  faker(faker: string): IFieldConfig
  description(description: string): IFieldConfig
}

export interface ITipeSchema {
  [apiId: string]: IModel
}
