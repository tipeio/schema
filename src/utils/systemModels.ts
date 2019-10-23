import { reservedNames } from '.'
import { fieldTypes } from './fieldTypes'

export const Asset = {
  name: reservedNames.asset,
  apiId: reservedNames.asset,
  fields: {
    url: fieldTypes.text(),
    key: fieldTypes.text(),
    name: fieldTypes.text(),
    mime: fieldTypes.text(),
    size: fieldTypes.text(),
    displayType: fieldTypes.text()
  }
}

export const systemModels = [Asset]
