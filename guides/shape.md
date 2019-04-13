`shape`
=======

Shape field type renders an editor for diplaying and selecting documents
Shape type must have a ref property with the API ID of the Shape to reference
### Example
```
new Shape('Person', {
  name: {
    type: types.text
  },
  favFood: {
    name: 'Favorite Food',
    types: types.shape,
    ref: 'Food'
  }
})

new Shape('Food', {
  name: {
    type: types.text
  },
  calories: {
    type: types.number
  }
  ...
})

```

### API
Shape type returns an object of related fields defied in your schema file
```
[FIELDS]
meta_info: {
  name <-- Name of document
  id <-- ID of document
}
```
