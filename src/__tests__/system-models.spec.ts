import { Asset } from '../system-shapes'
import { types } from '../utils/constants'

describe('System Models', () => {
  describe('Asset', () => {
    test('fields', () => {
      const fields: { [key: string]: { type: string; required: boolean } } = {
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
      }

      Object.keys(Asset.fields).forEach((name: string) => {
        const field = fields[name]

        expect(field).toBeTruthy()
        expect(field.required).toBe(Asset.fields[name].required)
        expect(field.type).toBe(Asset.fields[name].type)
      })
    })
  })
})
