import { IShape, IPreparedSchema, IShapeValidation } from './types'
import { systemModels } from './system-shapes'
import { validateShapes } from './model'

export const prepareShapes = (shapes: IShape[]): IPreparedSchema => {
  const errors = validateShapes(shapes)

  if (errors.length) {
    return { errors, shapes: [] }
  }

  return { errors: [], shapes: [...systemModels, ...shapes] }
}

export const prepareModels = (shapes: IShape[]): IPreparedSchema => {
  console.warn(
    '[Deprecated warning]. prepareModels is being depricated, use "prepareShapes()"'
  )
  return prepareShapes(shapes)
}
