import { IFields, IPage, IPageOptions } from '../types'
import { types } from '../utils/constants'
import { reduce, isObject, isString } from 'lodash'
import pathToRegexp from 'path-to-regexp'

export class Page implements IPage {
  public type = 'page'
  public fields: IFields
  public name: string
  public apiId: string
  public route: string
  public routeParams: string[]
  public isSingleRoute: boolean

  constructor(options: IPageOptions) {
    if (!isString(options.apiId)) throw new Error('Page API ID must be string')

    if (!isString(options.route)) throw new Error('Page route must be string')

    this.apiId = options.apiId
    this.name = options.name || options.apiId
    this.fields = this.normalizeFields(options.fields)
    this.routeParams = []
    this.isSingleRoute = this.routeIsSingle(options.route)
    this.route = options.route

    this.exposeRouteParams(options.route, this.routeParams)
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

    return routeParams
      .filter((obj: any) => {
        return (
          !this.fields[obj.name] ||
          !whiteList[this.fields[obj.name].type as string]
        )
      })
      .map((obj: any) => obj.name)
  }

  public exposeRouteParams(route: string, routeParamsStore: any[]): object[] {
    if (this.isSingleRoute) return routeParamsStore
    pathToRegexp(route, routeParamsStore)
    return routeParamsStore
  }

  public routeIsSingle(route: string): boolean {
    return !route.includes('/:')
  }

  public normalizeFields(fields: IFields): IFields {
    return reduce(
      fields,
      (final, field, apiId) => {
        if (!isString(apiId)) {
          throw new Error('Field API ID must be a string')
        }

        final[apiId] = {
          ...field,
          apiId,
          name: field.name || apiId,
          required: Boolean(field.required),
          array: Boolean(field.array),
          type: isObject(field.type)
            ? this.normalizeFields(field.type as IFields)
            : field.type
        }
        return final
      },
      {} as IFields
    )
  }
}