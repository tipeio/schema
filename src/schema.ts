import { IModel, ITipeSchema } from './types'
import { systemModels } from './utils/systemModels'
import { validateAllModels } from './utils/validations'

export const createTipeSchema = (models: IModel[]) => {
  const errors = validateAllModels(models)

  if (errors.length) {
    return { errors, schema: {} as ITipeSchema }
  }

  const schema: ITipeSchema = [...systemModels, ...models].reduce(
    (s, model) => {
      s[model.apiId] = model
      return s
    },
    {} as ITipeSchema
  )

  return { errors: [], schema }
}
