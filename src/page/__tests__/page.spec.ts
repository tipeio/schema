import { Page } from '../page'
import { types } from '../../utils'

describe('Page Shape', () => {
  it('should expose route params with a valid route', () => {
    const home = new Page({
      fields: {
        foo: {
          type: types.text
        }
      },
      name: 'routeParamTest',
      apiId: 'rpt',
      route: 'sampleRoute/:foo'
    })

    expect(home.routeParams.length).toBe(1)
  })

  it('should throw an error with an invalid route', () => {
    const page = () =>
      new Page({
        fields: {
          bar: {
            type: types.text
          }
        },
        name: 'routeParamTest',
        apiId: 'rpt',
        route: 'sampleRoute/:foo'
      })
    expect(page).toThrowError(new Error('Invalid Routes Present'))
  })

  it('should recognize a singular route', () => {
    const home = new Page({
      fields: {
        foo: {
          type: types.text
        }
      },
      name: 'routeParamTest',
      apiId: 'rpt',
      route: 'singleRoute'
    })

    expect(home.isSingleRoute).toBeTruthy()
  })
})
