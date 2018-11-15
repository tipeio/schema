import { validateModels, transformSchema } from './model'
import { IModel, IPreparedSchema } from './types'

export const prepareModels = (models: IModel[]): IPreparedSchema => {
  const errors = validateModels(models)

  if (errors.length) {
    return { errors, models: [] }
  }

  const finalModels = transformSchema(models)

  return {errors, models: finalModels}
}
