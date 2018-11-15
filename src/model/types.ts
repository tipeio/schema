import { ISchema } from '../schema/types'

export interface IModelInterface {
  schema: ISchema
  name: string
}
export interface IModelValidation {
  model: string
  error: string
}

export type ModelValidator = (model: IModelInterface, models: IModelInterface[]) => IModelValidation[]
