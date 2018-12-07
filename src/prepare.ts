import { validateModels } from './model'
import { IModel, IPreparedSchema } from './types'
import { systemModels } from './system-models'

export const prepareModels = (models: IModel[]): IPreparedSchema => {
  const errors = validateModels(models)

  if (errors.length) {
    return { errors, models: [] }
  }

  return { errors, models: [...systemModels, ...models] }
}
