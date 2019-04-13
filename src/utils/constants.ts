import { ISchemaTypes, IShapeTypes } from '../types'

export const types: ISchemaTypes = {
  richtext: 'RichText',
  text: 'Text',
  calendar: 'Calendar',
  number: 'Number',
  toggle: 'Toggle',
  asset: 'Asset',
  shape: 'Shape'
}

export const shapeTypes: IShapeTypes = {
  shape: 'shape',
  page: 'page'
}

export const systemShapes: { [key: string]: string } = {
  asset: 'TipeAsset',
  user: 'TipeUser',
  meta: 'TipeMeta'
}

export const systemFields = {
  meta: 'meta_info'
}
