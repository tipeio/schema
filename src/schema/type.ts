import {
  InvalidSchemaError,
  validUserTypes,
  defaultComponents,
  validComponentsForTypes
} from '../utils'
import {
  SchemaTypeFunction,
  SchemaTypeConfig,
  SchemaTypeFinal,
  EveryComponent
} from './types'

export const isValidComponentForType = (type: string, component: string): boolean => {
  const components = validComponentsForTypes[type]

  if (!components.length) {
    return false
  }

  return Boolean(components.find((c: EveryComponent) => c === component))
}

export const isObjectType = (type: string): boolean => (
  type === validUserTypes.shape
  || type === validUserTypes.document
  || type === validUserTypes.page
)

export const type: SchemaTypeFunction = (config: SchemaTypeConfig): SchemaTypeFinal => {
  const type = validUserTypes[config.type]

  if (!type) {
    throw new InvalidSchemaError(`"${config.type}" is not a valid type`)
  }
  
  // object types need a reference to the schema they are referencing
  if (isObjectType(type) && !config.ref) {
    throw new InvalidSchemaError(`Must supply "ref" for type "${type}"`)
  }

  const component = config.component || defaultComponents[type]

  if (!isValidComponentForType(type, component)) {
    throw new InvalidSchemaError(`Component "${component}" is not compatible with type "${type}"`)
  }
  
  // can't set defaults on object types
  if (isObjectType(type) && config.default !== undefined) {
    console.log(`Default will be ignored for type "${type}"`)
    delete config.default
  }
  
  // optional boolean options converted to for sure booleans
  const array = Boolean(config.isList)
  const required = Boolean(config.required)
  
  return {
    ...config,
    type,
    component,
    array,
    required
  }
}
