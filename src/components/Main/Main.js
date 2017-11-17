import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../../containers/Products/Products'
import Home from '../Home/Home'
// import style from './Main.scss'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/products' component={Products}/>
        <Route path='/product/:id' component={Products}/>
      </Switch>
    )
  }
}

export default Main
