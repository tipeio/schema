import { IModel, ITipeSchema } from './types'
import { systemModels } from './utils/systemModels'
import { validateAllModels, validatePreviewUrl } from './utils/validations'

export const createTipeSchema = (config: {
  models: IModel[]
  previewUrl?: string
}) => {
  const { models, previewUrl } = config
  const errors = validateAllModels(models)

  if (errors.length) {
    return { errors, schema: {} as ITipeSchema }
  }

  if (previewUrl) {
    const validurl = validatePreviewUrl(previewUrl)

    if (!validurl) {
      throw new Error('Invalid Preview URL')
    }
  }

  const schema: ITipeSchema = [...systemModels, ...models].reduce(
    (s, model) => {
      s[model.apiId] = model
      return s
    },
    {} as ITipeSchema
  )

  return { errors: [], schema, previewUrl }
}
