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
  markdown: 'Markdown',
  number: 'Number',
  boolean: 'Boolean',
  date: 'Date',
  page: 'Page',
  shape: 'Shape'
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
  'simpletext',
  'markdown',
  'numberselect',
  'calendar',
  'toggle',
  'shape',
  'asset'
]

export const components: IComponentsMap = {
  markdown: 'markdown',
  simpletext: 'simpletext',
  calendar: 'calendar',
  numberselect: 'numberselect',
  toggle: 'toggle',
  shape: 'shape'
}

export const defaultComponents: IComponents = {
  [types.number]: 'numberselect',
  [types.markdown]: 'markdown',
  [types.string]: 'simpletext',
  [types.shape]: 'shape',
  [types.date]: 'calendar',
  [types.boolean]: 'toggle'
}

export const validUserTypes: ITypeMap = {
  [types.string]: types.string,
  [types.number]: types.number,
  [types.date]: types.date,
  [types.boolean]: types.boolean,
  [types.shape]: types.shape,
  [types.markdown]: types.markdown
}

export const validComponentsForTypes: IValidComponentsMap = {
  [types.string]: [components.simpletext],
  [types.markdown]: [components.markdown],
  [types.number]: [components.numberselect],
  [types.boolean]: [components.toggle],
  [types.date]: [components.calendar],
  [types.shape]: [components.shape]
}
