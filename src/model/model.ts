import { ISchema, IModel, IUserSchema } from '../types'
import { field } from '../schema'
export abstract class Model implements IModel {
  public schema: ISchema
  public name: string

  constructor(name: string, schema: IUserSchema) {
    this.schema = this.transformSchemaFields(schema)
    this.name = name
  }
  
  /**
   * normalize user schema fields for processing
   * @param schema user schema object
   */
  private transformSchemaFields(schema: IUserSchema): ISchema {
    return Object.keys(schema)
      .reduce((s, fieldName) => {
        s[fieldName] = field(schema[fieldName])
        return s
      }, {} as ISchema)
  }
}
