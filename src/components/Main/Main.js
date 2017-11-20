import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../Pages/Products/Products'
import ProductDetail from '../../containers/Pages/ProductDetail/ProductDetail'
import Home from '../Pages/Home/Home'
// import style from './Main.scss'

class Main extends Component {
  render () {
    console.log(this.props)
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/products' render={this.ProductsWithProps.bind(this)}/>
        <Route path='/product/:id' component={ProductDetail}/>
      </Switch>
    )
  }

  ProductsWithProps() {
    const products = this.props.products.posts || []

    return (
      <Products
        products={products} />
    )
  }
}

export default Main
