import { Document } from './model'
import { models, types } from './utils'

export const Asset = new Document(models.asset, {
  url: {
    type: types.string,
    required: true
  },
  key: {
    type: types.string,
    required: true
  },
  name: {
    type: types.string,
    required: true
  },
  mime: {
    type: types.string,
    required: true
  },
  size: {
    type: types.string,
    required: true
  },
  displayType: {
    type: types.string,
    required: true
  }
})

export const systemModels = [Asset]
