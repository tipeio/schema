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
  public multi: boolean

  constructor(options: IPageOptions) {
    this.apiId = options.apiId
    this.name = options.name || options.apiId
    this.fields = normalizeFields(options.fields)
    this.multi = options.multi
  }
}
