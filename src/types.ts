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

export interface IValidComponentsMap {
  [type: string]: string[]
}

export type SchemaType =
  | 'RichText'
  | 'SimpleText'
  | 'Calendar'
  | 'Number'
  | 'Toggle'
  | 'Asset'
  | 'Shape'

export interface IShape {
  fields: IFields
  apiId: string
  name: string
  normalizeFields(fields: IFields): IFields
}
export interface IShapeValidation {
  shape: string
  error: string
  path?: string
}

export type ShapeValidator = (
  shape: IShape,
  shapes: IShape[]
) => IShapeValidation[]

export interface IPreparedSchema {
  errors: IShapeValidation[]
  shapes: IShape[]
}
