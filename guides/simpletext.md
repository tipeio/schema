`text`
=======

text field type renders a string input editor on the dashboard

### Example
```
new Shape('Properties', {
  name: {
    type: types.text
  },
  locations: {
    type: types.text,
    name: 'Addresses',
    array: true
  }
})
```

### API
text type returns a string of any length
