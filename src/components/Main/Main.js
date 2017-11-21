import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Products from '../Pages/Products/Products'
import ProductDetail from '../../containers/Pages/ProductDetail/ProductDetail'
import Home from '../Pages/Home/Home'
// import style from './Main.scss'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/products' render={this.ProductsWithProps.bind(this)}/>
        <Route exact path='/archives/product/:slug' component={ProductDetail}/>
      </Switch>
    )
  }

  /*
  * We need to pass some props from App to the routed components
  */
  ProductsWithProps () {
    const products = this.props.products.posts || []
    return (
      <Products
        products={products} />
    )
  }
}

Main.propTypes = {
  products: PropTypes.object.isRequired
}

export default Main
