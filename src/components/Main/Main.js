import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Home from '../Pages/Home/Home'

const Loading = props => {
  // TODO: we'll change this when we have the designs available
  return <div>Loading...</div>
}

const ProductDetailLoadable = Loadable({
  loader: () => import('../../containers/Pages/ProductDetail/ProductDetail'),
  loading: Loading
})

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/product/:slug' component={ProductDetailLoadable}/>
      </Switch>
    )
  }
}

export default Main
