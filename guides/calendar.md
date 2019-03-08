`calendar`
=======

Calendar field type renders a Calendar editor for displaying dates on the dashboard

### Example
```
new Shape('Holiday', {
  name: {
    type: types.simpletext
  },
  date: {
    type: types.calendar
  }
})
```

### API
Calendar type returns a number representing unix timestamp
