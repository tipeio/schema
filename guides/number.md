`number`
=======

Number field type renders a number input

### Example
```
new Shape('Sku', {
  name: {
    type: types.simpletext
  },
  price: {
    type: types.number
  },
  tags: {
    type: types.simpletext,
    array: true
  }
})
```

### API
Number type returns any valid javascript number
