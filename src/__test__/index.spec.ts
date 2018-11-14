import { add } from '../index'

describe('add', () => {
  test('should add', () => {
    const result = add(1, 2)

    expect(result).toBe(3)
    expect(add(30, (null as unknown) as number)).toBe(NaN)
  })
})
