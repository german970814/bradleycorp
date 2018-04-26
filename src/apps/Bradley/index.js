// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// need this for IE10
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'custom-event-polyfill'

import App from './App/App'

const main = document.querySelector('main')
if (main) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    main
  )
}
