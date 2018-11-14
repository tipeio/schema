import { type } from '../index';

describe('schema-types', () => {
  describe('type', () => {
    test('checks for valid types', () => {
      expect(() => type({type: 'poop'})).toThrow(/poop/)
      expect(() => type({type: 'string'})).not.toThrow(/string/)
    })
    test('checks for ref on object types', () => {
      expect(() => type({type: 'shape'})).toThrow(/ref/)
      expect(() => type({type: 'shape', ref: 'hello'})).not.toThrow(/ref/)
    })
    test('checks for valid components', () => {
      expect(() => type({type: 'string', component: 'toggle'})).toThrow(/Component/)
      expect(() => type({type: 'string', component: 'markdown'})).not.toThrow(/Component/)
    })
  })
})
