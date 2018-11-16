import { field } from '../field'
import { types } from '../../utils'

describe('schema-types', () => {
  describe('type', () => {
    test('checks for valid types', () => {
      expect(() => field({ type: 'poop' })).toThrow(/poop/)
      expect(() => field({ type: types.string })).not.toThrow(/string/)
    })
    test('checks for ref on object types', () => {
      expect(() => field({ type: types.shape })).toThrow(/ref/)
      expect(() => field({ type: types.shape, ref: 'hello' })).not.toThrow(/ref/)
    })
    test('checks for valid components', () => {
      expect(() => field({ type: types.string, component: 'toggle' })).toThrow(
        /Component/
      )
      expect(() => field({ type: types.string, component: 'markdown' })).not.toThrow(
        /Component/
      )
    })
  })
})
