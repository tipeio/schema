import { Shape } from './shape'
import { systemShapes, types } from './utils'

export const Asset = new Shape(systemShapes.asset, {
  url: {
    type: types.text,
    required: true
  },
  key: {
    type: types.text,
    required: true
  },
  name: {
    type: types.text,
    required: true
  },
  mime: {
    type: types.text,
    required: true
  },
  size: {
    type: types.text,
    required: true
  },
  displayType: {
    type: types.text,
    required: true
  }
})

export const systemModels = [Asset]
