# type-to-reducer-addons

Describe easily your redux reducer, working in couple with [type-to-reducer](https://github.com/tomatau/type-to-reducer).
*type-to-reducer-addons*, like *type-to-reducer*, works well following API suggested by [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware).

## Usage

`npm install type-to-reducer type-to-reducer-addons --save`

A usage of *type-to-reducer* like that:

```js
import typeToReducer from 'type-to-reducer'

const initialState = {
  user: {
    data: null,
    fetching: false,
    fetched: false,
    error: false,
  },
}

export const reducer = typeToReducer({
  [ USER_FETCH ]: {
    PENDING: () => ({
      ...initialState,
      fetching: true,
    }),
    REJECTED: (state, action) => ({
      ...initialState,
      fetching: false,
      error: action.payload,
    }),
    FULFILLED: (state, action) => ({
      ...initialState,
      fetching: false,
      fetched: true,
      data: action.payload,
    })
  }
}, initialState)
```

can be easily compacted writing something like that:
```js
import typeToReducer from 'type-to-reducer'
import typedReducer from 'type-to-reducer-addons'

const initialState = {
  user: {
    data: null,
    fetching: false,
    fetched: false,
    error: false,
  },
}

export const reducer = typeToReducer({
  [ USER_FETCH ]: typedReducer('user')
}, initialState)
```

