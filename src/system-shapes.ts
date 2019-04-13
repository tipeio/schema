import { Shape } from './shape'
import { systemShapes, types } from './utils'

export const Asset = new Shape({
  apiId: systemShapes.asset,
  name: systemShapes.asset,
  fields: {
    url: {
      type: types.text
    },
    key: {
      type: types.text
    },
    name: {
      type: types.text
    },
    mime: {
      type: types.text
    },
    size: {
      type: types.text
    },
    displayType: {
      type: types.text
    }
  }
})

export const systemModels = [Asset]
