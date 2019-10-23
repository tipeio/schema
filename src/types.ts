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
  code: 'Code'
  text: 'Text'
  toggle: 'Toggle'
  image: 'Image'
  html: 'Html'
  markdown: 'Markdown'
  button: 'Button'
  [type: string]: string
}

export interface IModelTypes {
  page: 'page'
}

export interface IValidComponentsMap {
  [type: string]: string[]
}

export type SchemaType =
  | string
  | 'Code'
  | 'Text'
  | 'Toggle'
  | 'Image'
  | 'Html'
  | 'Markdown'
  | 'Button'
export type IModel = IPage

export interface IPage {
  type: string
  fields: IFields
  apiId: string
  name: string
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
  multi: boolean
}

export interface IFieldConfig extends IFieldMeta {
  options: IField
}

export interface IFieldTypeCreator {
  object(config: IFieldsConfigs): IFieldConfig
  ref(shape: IPage | string): IFieldConfig
  text(): IFieldConfig
  toggle(): IFieldConfig
  image(): IFieldConfig
  code(): IFieldConfig
  html(): IFieldConfig
  markdown(): IFieldConfig
  button(): IFieldConfig
}

export interface IFieldMeta {
  name(name: string): IFieldConfig
  faker(faker: string): IFieldConfig
  description(description: string): IFieldConfig
}

export interface ITipeSchema {
  [apiId: string]: IModel
}
