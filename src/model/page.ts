import { Model } from './model'
import { IUserSchema, IFields } from '../types'
import { fields, models, types } from '../utils'
export class Page extends Model {
  public readonly modelType = 'Page'

  protected transformSchemaFields(userFields: IUserSchema): IFields {
    // add meta fields
    const metaField = {
      [fields.meta]: {
        type: types.shape,
        ref: models.meta
      }
    }
    // overwrite field with same name if there
    const finalFields = {...userFields, ...metaField}

    return super.transformSchemaFields(finalFields)
  }
}
