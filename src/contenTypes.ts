import { IShape } from './types'
import { types } from './utils/constants'

const attrs = (opts: { [key: string]: any }) => ({
  name(name: string) {
    opts.name = name
    return this
  },
  faker(faker: string) {
    opts.faker = faker
    return this
  }
})

const createField = (config: { [key: string]: any }) => ({
  options: config.options,
  ...attrs(config.options)
})

export const fieldTypes = {
  object(config: { [key: string]: any }) {
    return createField({
      type: config
    })
  },
  ref(shape: IShape | string) {
    let ref = shape

    if (typeof shape !== 'string') {
      ref = shape
    }

    return createField({
      ref,
      type: types.shape
    })
  },
  text() {
    return createField({
      type: types.text
    })
  },
  richText() {
    return createField({
      type: types.richtext
    })
  },
  toggle() {
    return createField({
      type: types.toggle
    })
  },
  number() {
    return createField({ type: types.number })
  },
  calendar() {
    return createField({ type: types.calendar })
  },
  asset() {
    return createField({ type: types.asset })
  }
}
