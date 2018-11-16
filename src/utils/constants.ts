import {
  IComponents,
  ITypeMap,
  IValidComponentsMap,
  EveryComponent,
  IComponentsMap,
  ITypes
} from '../types'

export const types: ITypes = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  date: 'Date',
  document: 'Document',
  shape: 'Shape',
  page: 'Page'
}

export const models = {
  asset: 'TipeAsset',
  user: 'TipeUser',
  meta: 'TipeMeta'
}

export const fields = {
  meta: 'meta_info'
}

export const componentsList: EveryComponent[] = [
  'range',
  'simpletext',
  'markdown',
  'calendar',
  'toggle',
  'color',
  'shape',
  'asset',
  'document'
]

export const components = componentsList.reduce(
  (m, c) => {
    m[c] = c
    return m
  },
  {} as IComponentsMap
)

export const defaultComponents: IComponents = {
  [types.number]: 'range',
  [types.string]: 'simpletext',
  [types.shape]: 'shape',
  [types.date]: 'calendar',
  [types.document]: 'document',
  [types.boolean]: 'toggle'
}

export const validUserTypes: ITypeMap = {
  [types.string]: types.string,
  [types.number]: types.number,
  [types.date]: types.date,
  [types.boolean]: types.boolean,
  [types.shape]: types.shape,
  [types.document]: types.document
}

export const validComponentsForTypes: IValidComponentsMap = {
  [types.string]: [components.markdown, components.simpletext],
  [types.number]: [components.range],
  [types.boolean]: [components.toggle],
  [types.date]: [components.calendar],
  [types.shape]: [components.shape],
  [types.document]: [components.document]
}
