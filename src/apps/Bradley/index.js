import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// need this for IE10
import 'core-js/es6/map'
import 'core-js/es6/set'

import App from './App/App'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.querySelector('main')
)
