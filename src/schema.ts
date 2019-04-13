import { IShape, IPreparedSchema, IShapeValidation } from './types'
import { systemModels } from './utils/systemModels'
import { validateModels } from './utils/validations'

export const prepareShapes = (shapes: IShape[]): IPreparedSchema => {
  const errors = validateModels(shapes)

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
