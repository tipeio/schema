import { Schema } from '../schema/types'

export interface ModelInterface {
  schema: Schema
  name: string
}
export type ModelValidation = {
  model: string
  error: string
}

export interface ModelValidator {
  (model: ModelInterface, models: ModelInterface[]): ModelValidation[]
}
