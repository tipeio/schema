`simpletext`
=======

Simpletext field type renders a string input editor on the dashboard

### Example
```
new Shape('Properties', {
  name: {
    type: types.simpletext
  },
  locations: {
    type: types.simpletext,
    name: 'Addresses',
    array: true
  }
})
```

### API
Simpletext type returns a string of any length