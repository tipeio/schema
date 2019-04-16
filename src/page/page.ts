import pathToRegexp from 'path-to-regexp'
import { isString } from 'lodash'
import { normalizeFields } from '../utils/normalize-fields'
import { IFields, IPage, IPageOptions } from '../types'
import { types } from '../utils/constants'

export class Page implements IPage {
  public type = 'page'
  public fields: IFields
  public name: string
  public apiId: string
  public route: string
  public routeParams: string[]
  public multi: boolean

  constructor(options: IPageOptions) {
    if (!isString(options.route)) throw new Error('Page route must be string')

    this.apiId = options.apiId
    this.name = options.name || options.apiId
    this.fields = normalizeFields(options.fields)
    this.multi = this.multiRoute(options.route)
    this.route = options.route
    this.routeParams = this.exposeRouteParams(this.route)
    const invalidRoutes = this.invalidateRouteParams(this.routeParams)

    if (invalidRoutes.length) throw new Error('Invalid Routes Present')
  }

  public invalidateRouteParams(routeParams: any[]): object[] {
    const whiteList = Object.keys(types).reduce(
      (acc, typeKey) => {
        acc[types[typeKey]] = true
        return acc
      },
      {} as any
    )

    return routeParams.filter(
      (param: string) =>
        !this.fields[param] || !whiteList[this.fields[param].type as string]
    )
  }

  public exposeRouteParams(route: string): any[] {
    const params: any[] = []

    if (!this.multi) return params

    pathToRegexp(route, params)

    return params.map(param => {
      const { name } = param
      return name
    })
  }

  public multiRoute(route: string): boolean {
    return route.includes('/:')
  }
}
