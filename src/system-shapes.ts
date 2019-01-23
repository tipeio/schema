import { Shape } from './shape'
import { systemShapes, types } from './utils'

export const Asset = new Shape(systemShapes.asset, {
  url: {
    type: types.simpletext,
    required: true
  },
  key: {
    type: types.simpletext,
    required: true
  },
  name: {
    type: types.simpletext,
    required: true
  },
  mime: {
    type: types.simpletext,
    required: true
  },
  size: {
    type: types.simpletext,
    required: true
  },
  displayType: {
    type: types.simpletext,
    required: true
  }
})

export const systemModels = [Asset]
