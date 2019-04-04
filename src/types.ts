import { SchemaType } from './types'
export interface IField {
  type: SchemaType | IFields
  apiId?: string
  name?: string
  required?: boolean
  array?: boolean
  ref?: string
  description?: string
  faker?: string
}

export interface IFields {
  [fieldName: string]: IField
}

export interface ISchemaTypes {
  richtext: 'RichText'
  simpletext: 'SimpleText'
  calendar: 'Calendar'
  number: 'Number'
  toggle: 'Toggle'
  asset: 'Asset'
  shape: 'Shape'
  [type: string]: string
}

export interface IShapeTypes {
  shape: 'shape'
  page: 'page'
}

export interface IValidComponentsMap {
  [type: string]: string[]
}

export type SchemaType =
  | string
  | 'RichText'
  | 'SimpleText'
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
  isSingleRoute?: boolean
}

export interface IPage {
  type: string
  fields: IFields
  apiId: string
  name: string
  route: string
  routeParams: string[]
  isSingleRoute: boolean
}

export interface IShapeValidation {
  shape?: string
  page?: string
  error: string
  path?: string
}

export interface IPageOptions {
  fields: IFields
  apiId: string
  name: string
  route: string
}

export type ShapeValidator = (
  shape: IShape,
  shapes: IShape[]
) => IShapeValidation[]

export interface IPreparedSchema {
  errors: IShapeValidation[]
  shapes: IShape[]
}
