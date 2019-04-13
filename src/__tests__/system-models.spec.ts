import { Asset } from '../system-shapes'
import { types } from '../utils/constants'

describe('System Models', () => {
  describe('Asset', () => {
    test('fields', () => {
      const fields: { [key: string]: { type: string; required: boolean } } = {
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
