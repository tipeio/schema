import { Document, Shape } from './model'
import {models, types} from './utils'

export const Meta = new Shape(models.meta, {
  id: {
    type: types.string,
    required: true
  },
  createdBy: {
    type: types.document,
    ref: models.user
  },
  status: {
    type: types.string,
    required: true
  }
})

export const Asset = new Document(models.asset, {
  url: {
    type: types.string,
    required: true
  },
  key: {
    type: types.string,
    required: true
  },
  name: {
    type: types.string,
    required: true
  },
  mime: {
    type: types.string,
    required: true
  },
  size: {
    type: types.string,
    required: true
  }
})

export const User = new Document(models.user, {
  email: {
    type: types.string,
    required: true
  },
  firstName: {
    type: types.string
  },
  lastName: {
    type: types.string
  },
  avatar: {
    type: types.string
  }
})

export const systemModels = [User, Asset, Meta]
