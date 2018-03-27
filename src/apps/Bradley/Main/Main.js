import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import Home from '../Pages/Home/Home'

const ProductDetailLoadable = Loadable({
  loader: () => import('../Pages/ProductDetail/ProductDetail'),
  loading: Loading
})

const CustomizableLoadable = Loadable({
  loader: () => import('../Pages/Customizable/Customizable'),
  loading: Loading
})

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/product/:slug' component={ProductDetailLoadable}/>
        <Route exact path='/:slug' component={CustomizableLoadable}/>
      </Switch>
    )
  }
}

export default Main