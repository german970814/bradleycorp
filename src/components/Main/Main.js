import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../../containers/Pages/Products/Products'
import ProductDetail from '../../containers/Pages/ProductDetail/ProductDetail'
import Home from '../Home/Home'
// import style from './Main.scss'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/products' component={Products}/>
        <Route path='/product/:id' component={ProductDetail}/>
      </Switch>
    )
  }
}

export default Main
