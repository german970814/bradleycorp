import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import reducers from './reducers'

import App from './containers/App'

// set up store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, /* preloadedState, */  composeEnhancers(
    applyMiddleware(
      promiseMiddleware(),
      thunk
    )
))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('main')
)

export default store
