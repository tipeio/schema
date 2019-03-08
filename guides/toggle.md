`toggle`
=======

Toggle field type renders a switch editor on the dashboard

### Example
```
new Shape('Deals', {
  name: {
    type: types.simpletext
  },
  active: {
    type: types.toggle
  }
  discount: {
    ....
  }
})
```

### API
Toggle type returns a boolean