import { ISchema } from '../schema/types'
import { IModelInterface } from './types'

export abstract class Model implements IModelInterface {
  public schema: ISchema
  public name: string

  constructor(name: string, schema: ISchema) {
    this.schema = schema
    this.name = name
    const me = "sadf"
  }
}
