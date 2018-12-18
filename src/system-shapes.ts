import { Shape } from './model'
import { systemShapes, types } from './utils'

export const Asset = new Shape(systemShapes.asset, {
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
