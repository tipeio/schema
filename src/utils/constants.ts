import {
  IComponents,
  ITypeMap,
  IValidComponentsMap,
  EveryComponent,
  IComponentsMap
} from '../types'

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

export const componentsMap = componentsList.reduce(
  (m, c) => {
    m[c] = c
    return m
  },
  {} as IComponentsMap
)

export const defaultComponents: IComponents = {
  number: 'range',
  string: 'simpletext',
  shape: 'shape',
  date: 'calendar',
  document: 'document',
  asset: 'asset',
  boolean: 'toggle'
}

export const validUserTypes: ITypeMap = {
  string: 'string',
  number: 'number',
  date: 'date',
  boolean: 'boolean',
  asset: 'asset',
  shape: 'shape',
  document: 'document'
}

export const validComponentsForTypes: IValidComponentsMap = {
  [validUserTypes.string]: [componentsMap.markdown, componentsMap.simpletext],
  [validUserTypes.number]: [componentsMap.range],
  [validUserTypes.boolean]: [componentsMap.toggle],
  [validUserTypes.date]: [componentsMap.calendar]
}
