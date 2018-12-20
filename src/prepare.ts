import { validateShapes } from './model'
import { IShape, IPreparedSchema } from './types'
import { systemModels } from './system-shapes'

export const prepareModels = (shapes: IShape[]): IPreparedSchema => {
  const errors = validateShapes(shapes)

  if (errors.length) {
    return { errors, shapes: [] }
  }

  return { errors, shapes: [...systemModels, ...shapes] }
}
