import { Asset } from '../system-models'
import { types } from '../utils/constants'

describe('System Models', () => {
  describe('Asset', () => {
    test('fields', () => {
      const fields: { [key: string]: { type: string; required: boolean } } = {
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
