import { Asset } from '../systemModels'

describe('system models', () => {
  describe('Asset', () => {
    test('fields', () => {
      expect(Asset.fields).toEqual(
        expect.objectContaining({
          url: expect.any(Object),
          key: expect.any(Object),
          name: expect.any(Object),
          mime: expect.any(Object),
          size: expect.any(Object),
          displayType: expect.any(Object)
        })
      )
    })
  })
})
