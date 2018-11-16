import { IModel, IFieldNormalized, IFields  } from '../types'

const addDisplayNameToFields = (model: IModel): IModel => {
  const fields = Object.keys(model.fields)
    .reduce((m, name: string) => {
      const field: IFieldNormalized = model.fields[name]
      const displayName = field.displayName || name

      m[name] = {...field, displayName}
      return m
    }, {} as IFields)
    
    return {...model, fields}
}

export const transformSchema = (models: IModel[]): IModel[] => {
  const finalModels = models.map(addDisplayNameToFields)
  return finalModels
}
