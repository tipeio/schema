import { ISchemaTypes } from '../types'

export const types: ISchemaTypes = {
  richtext: 'RichText',
  simpletext: 'SimpleText',
  calendar: 'Calendar',
  number: 'Number',
  toggle: 'Toggle',
  asset: 'Asset',
  shape: 'Shape'
}

export const systemShapes: { [key: string]: string } = {
  asset: 'TipeAsset',
  user: 'TipeUser',
  meta: 'TipeMeta'
}

export const systemFields = {
  meta: 'meta_info'
}
