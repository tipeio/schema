import { field } from '../field'

describe('schema-types', () => {
  describe('type', () => {
    test('checks for valid types', () => {
      expect(() => field({ type: 'poop' })).toThrow(/poop/)
      expect(() => field({ type: 'string' })).not.toThrow(/string/)
    })
    test('checks for ref on object types', () => {
      expect(() => field({ type: 'shape' })).toThrow(/ref/)
      expect(() => field({ type: 'shape', ref: 'hello' })).not.toThrow(/ref/)
    })
    test('checks for valid components', () => {
      expect(() => field({ type: 'string', component: 'toggle' })).toThrow(
        /Component/
      )
      expect(() => field({ type: 'string', component: 'markdown' })).not.toThrow(
        /Component/
      )
    })
  })
})
