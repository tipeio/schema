import { IModelFieldTypes, IModelTypes } from '../types'

export const types: IModelFieldTypes = {
  richtext: 'RichText',
  text: 'Text',
  calendar: 'Calendar',
  number: 'Number',
  toggle: 'Toggle',
  asset: 'Asset',
  shape: 'Shape'
}

export const modelTypes: IModelTypes = {
  shape: 'shape',
  page: 'page'
}

export const reservedNames: { [key: string]: string } = {
  asset: 'TipeAsset',
  user: 'TipeUser',
  meta: 'TipeMeta'
}

export const systemFields = {
  meta: 'meta_info'
}
