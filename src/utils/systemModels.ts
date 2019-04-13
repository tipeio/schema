import { Shape } from '../shape'
import { reservedNames } from '.'
import { fieldTypes } from './fieldTypes'

export const Asset = new Shape({
  apiId: reservedNames.asset,
  name: reservedNames.asset,
  fields: {
    url: fieldTypes.text(),
    key: fieldTypes.text(),
    name: fieldTypes.text(),
    mime: fieldTypes.text(),
    size: fieldTypes.text(),
    displayType: fieldTypes.text()
  }
})

export const systemModels = [Asset]
