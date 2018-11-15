import { Model } from './model'
import { ISchema } from '../schema/types'

export class Document extends Model {
  public readonly modelType = 'Document'

  constructor(name: string, schema: ISchema) {
    super(name, schema)
  }
}
