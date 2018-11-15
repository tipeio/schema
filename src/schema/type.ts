import {
  InvalidSchemaError,
  validUserTypes,
  defaultComponents,
  validComponentsForTypes
} from '../utils'
import {
  SchemaTypeFunction,
  ISchemaTypeConfig,
  ISchemaTypeFinal,
  EveryComponent
} from './types'

export const isValidComponentForType = (
  schemaType: string,
  component: string
): boolean => {
  const components = validComponentsForTypes[schemaType]

  if (!components.length) {
    return false
  }

  return Boolean(components.find((c: EveryComponent) => c === component))
}

export const isObjectType = (schemaType: string): boolean =>
  schemaType === validUserTypes.shape ||
  schemaType === validUserTypes.document ||
  schemaType === validUserTypes.page

export const type: SchemaTypeFunction = (
  config: ISchemaTypeConfig
): ISchemaTypeFinal => {
  const schemaType = validUserTypes[config.type]

  if (!schemaType) {
    throw new InvalidSchemaError(`"${config.type}" is not a valid type`)
  }

  // object types need a reference to the schema they are referencing
  if (isObjectType(schemaType) && !config.ref) {
    throw new InvalidSchemaError(`Must supply "ref" for type "${schemaType}"`)
  }

  const component = config.component || defaultComponents[schemaType]

  if (!isValidComponentForType(schemaType, component)) {
    throw new InvalidSchemaError(
      `Component "${component}" is not compatible with type "${schemaType}"`
    )
  }

  // can't set defaults on object types
  if (isObjectType(schemaType) && config.default !== undefined) {
    console.log(`Default will be ignored for type "${schemaType}"`)
    delete config.default
  }

  // optional boolean options converted to for sure booleans
  const array = Boolean(config.isList)
  const required = Boolean(config.required)

  return {
    ...config,
    schemaType,
    component,
    array,
    required
  }
}
