import { Page } from '../page'
import { types } from '../../utils'

describe('Page Shape', () => {
  it('should expose route params with a valid route', () => {
    const home = new Page({
      fields: {
        foo: {
          type: types.simpletext
        }
      },
      name: 'routeParamTest',
      apiId: 'rpt',
      route: 'sampleRoute/:foo'
    })

    expect(home.routeParams.length).toBe(1)
  })

  it('should throw an error with an invalid route', () => {
    expect(() => {
      new Page({
        fields: {
          bar: {
            type: types.simpletext
          }
        },
        name: 'routeParamTest',
        apiId: 'rpt',
        route: 'sampleRoute/:foo'
      })
    }).toThrowError(new Error('Invalid Routes Present'))
  })

  it('should recognize a singular route', () => {
    const home = new Page({
      fields: {
        foo: {
          type: types.simpletext
        }
      },
      name: 'routeParamTest',
      apiId: 'rpt',
      route: 'singleRoute'
    })

    expect(home.isSingleRoute).toBeTruthy()
  })
})
