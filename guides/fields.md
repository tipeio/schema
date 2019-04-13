`fields`
========
Fields can be comprised of many different [Types](../src/types.ts) when designing your schema.

The properties of your field object directly represent your content from the API and different content editors rendered on the dashboard

### Getting Started
To create fields, the `key` of the object represents the field API ID and will also be the name of the field on the dashboard; unless specified otherwise
```
new Shape('Author', 'Author', {
  name: {
    type: types.text
  },
  age: {
    type: types.text,
    name: 'Birthday' <--- Will display Birthday instead of age on dashboard
  }
})
```

You're able to turn all types into an array for multiple values from server. Whatever order is selected on the dashboard will be the order retrieved from the API
```
new Shape('Hotel', {
  name: {
    type: types.text
  },
  images: {
    type: types.asset,
    array: true <--- will return an array of asset objects from API
  }
})
```

You're also able to group types together to create a sudo shape. <b>You can't add nested shapes or array types to groups</b>.
```
new Shape('HomePage', {
  heroSection: { <--- Group type
    title: {
      type: types.text
    },
    backgroundImg: {
      type: types.asset,
      name: 'HeroImg'  
    },
    btnTxt: {
      type: types.text,
      array: true <--- Not allowed in groups
    }
  }
})
```
