import { IModel, ISchemaTypeFinal, ISchema  } from '../types'

const addDisplayNameToFields = (model: IModel): IModel => {
  const schema = Object.keys(model.schema)
    .reduce((m, name: string) => {
      const field: ISchemaTypeFinal = model.schema[name]
      const displayName = field.displayName || name

      m[name] = {...field, displayName}
      return m
    }, {} as ISchema)
  
  return {...model, schema}
}

export const transformSchema = (models: IModel[]): IModel[] => {
  const finalModels = models.map(addDisplayNameToFields)
  return finalModels
}
