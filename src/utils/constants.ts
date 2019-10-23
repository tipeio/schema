import { IModelFieldTypes, IModelTypes } from '../types'

export const types: IModelFieldTypes = {
  text: 'Text',
  toggle: 'Toggle',
  image: 'Image',
  ref: 'Page',
  code: 'Code',
  html: 'Html',
  button: 'Button',
  markdown: 'Markdown'
}

export const modelTypes: IModelTypes = {
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
