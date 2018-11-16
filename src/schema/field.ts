import {
  InvalidSchemaError,
  validUserTypes,
  defaultComponents,
  validComponentsForTypes,
  types
} from '../utils'
import {
  SchemaTypeFunction,
  ISchemaTypeConfig,
  ISchemaTypeFinal,
  EveryComponent
} from '../types'

export const isValidComponentForType = (
  fieldType: string,
  component: string
): boolean => {
  const components = validComponentsForTypes[fieldType] || []

  if (!components.length) {
    return false
  }

  return Boolean(components.find((c: EveryComponent) => c === component))
}

export const isObjectType = (fieldType: string): boolean =>
  fieldType === types.shape ||
  fieldType === types.document ||
  fieldType === types.page

export const field: SchemaTypeFunction = (
  config: ISchemaTypeConfig
): ISchemaTypeFinal => {
  const fieldType = validUserTypes[config.type]

  if (!fieldType) {
    throw new InvalidSchemaError(`"${config.type}" is not a valid type`)
  }

  // object types need a reference to the schema they are referencing
  if (isObjectType(fieldType) && !config.ref) {
    throw new InvalidSchemaError(`Must supply "ref" for type "${fieldType}"`)
  }

  const component = config.component || defaultComponents[fieldType]

  if (!isValidComponentForType(fieldType, component)) {
    throw new InvalidSchemaError(
      `Component "${component}" is not compatible with type "${fieldType}"`
    )
  }

  // can't set defaults on object types
  if (isObjectType(fieldType) && config.default !== undefined) {
    console.log(`Default will be ignored for type "${fieldType}"`)
    delete config.default
  }

  // optional boolean options converted to for sure booleans
  const array = Boolean(config.isList)
  const required = Boolean(config.required)

  return {
    ...config,
    component,
    array,
    required,
    type: fieldType
  }
}
