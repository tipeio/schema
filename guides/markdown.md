`markdown`
=======

Markdown field type renders an editor for writing markdown on the dashboard

### Example
```
new Shape('BlogPost', {
  name: {
    type: types.simpletext
  },
  post: {
    type: types.markdown
  }
})
```

### API
Markdown type returns a string of markdown
