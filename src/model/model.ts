import { IFields, IModel, IUserSchema } from '../types'
import { field } from '../schema'
export abstract class Model implements IModel {
  public fields: IFields
  public name: string

  constructor(name: string, fields: IUserSchema) {
    this.fields = this.transformSchemaFields(fields)
    this.name = name
  }
  
  /**
   * normalize user schema fields for processing
   * @param schema user schema object
   */
  protected transformSchemaFields(fields: IUserSchema): IFields {
    return Object.keys(fields)
      .reduce((s, fieldName) => {
        s[fieldName] = field(fields[fieldName])
        return s
      }, {} as IFields)
  }
}
