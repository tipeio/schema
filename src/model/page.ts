import { Model } from './model'
import { ISchema } from '../schema/types'

export class Page extends Model {
  public readonly modelType = 'Page'

  constructor(name: string, schema: ISchema) {
    super(name, schema)  
  }
}
