`number`
=======

Number field type renders a number input

### Example
```
new Shape('Sku', {
  name: {
    type: types.text
  },
  price: {
    type: types.number
  },
  tags: {
    type: types.text,
    array: true
  }
})
```

### API
Number type returns any valid javascript number
