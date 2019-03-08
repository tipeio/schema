`asset`
=======

Asset field type is renders an Asset editor for displaying dates on the dashboard
We accept images, video, text and audio files up to a certain size per upload

### Example
```
new Shape('Gallery', {
  preview: {
    type: types.asset
  },
  favList: {
    type: types.asset,
    array: true
  }
})
```

### API
Asset type returns an object from the API with associated properties
```
url
mime
size
meta_info: {
  name <-- Name of asset
  id <-- ID of asset
}
```