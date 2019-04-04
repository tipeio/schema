import { Shape } from '../../shape'
import { types } from '../constants'
import { validateShape } from '../validations'
import { IShape } from '../../types'

describe('rules', () => {
  test('shape type cannot reference another shape', () => {
    const author = new Shape('Author1', {
      name: {
        type: types.simpletext
      }
    })

    const shapeWithShape = new Shape('Author2', 'Author2', {
      cool: {
        type: types.shape,
        ref: 'Author1'
      }
    })
    const errors = validateShape(shapeWithShape, [shapeWithShape, author])
    expect(errors).toHaveLength(2)
  })
})
