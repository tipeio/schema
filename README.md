# Tipe Schema
![Tipe logo](https://cdn.tipe.io/tipe/tipe-cat-no-text.svg)

## Overview
Tipe schema is used to model your content and API from a single file <br>
Your schema is designed to be used with [Tipe cli](https://github.com/tipeio/tipe-cli/)<br>
yarn add @tipe/schema <br>
npm install @tipe/schema

`Getting Started`
=================
Create your first shape by invoking [`new Shape`](guides/Shape.md)
### [Types](./src/types.ts)
Types are used for value types for the API and rendering associated editors on the dashboard.
- [richtext](guides/richtext.md)
- [simpletext](guides/simpletext.md)
- [calendar](guides/calendar.md)
- [number](guides/number.md)
- [toggle](guides/toggle.md)
- [asset](guides/asset.md)
- [shape](guides/shape.md)

## Example Schema
```
import { Shape, types } from '@type/schema'

const Post = new Shape('Post', {
  title: {
    type: types.simpletext
  },
  body: {
    type: types.richtext
  },
  author: {
    type: types.shape,
    ref: 'Author'
  }
})

const Author = new Shape('Author', {
  name: {
    type: types.simpletext
  },
  leadingAuthor: {
    type: types.toggle
  }
})

const PostPage = new Shape('PostsPage', {
  header: {
    type: {
      title: {
        type: types.simpletext
      },
      body: {
        type: types.richtext
      }
    }
  },
  posts: {
    type: types.shape,
    ref: 'Post',
    array: true
  }
})
```
# Issues
For problems directly related to the schema, [add an issue on GitHub.](https://github.com/tipeio/schema/issues)

For other issues, [submit a support ticket.](https://tipe.io)
# Developing
```
yarn install
```

To cut a release, commit you messages using our [commit guide](https://github.com/tipeio/tipe-conventions/blob/4987a13f29bc7e5fcbb428dd7b245fedcd5bf6ce/COMMIT_CONVENTION.md#git-commit-message-convention)
