import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from '../../Product/Product'
// import style from './Products.scss'

class Products extends Component {
  constructor (props) {
    super(props)

    this.renderProducts = this.renderProducts.bind(this)
  }

  componentWillMount() {
    let newProducts = productApiClient.getProductsWithFilters( this.props.filters )
    this.setState( products: newProducts );
  }

  componentDidUpdate (prevProps) {
    if (prevProps.filters !== this.props.filters) {
      let newProducts = productApiClient.getProductsWithFilters( this.props.filters )
      this.setState( products: newProducts );
    }
  }

  renderProducts () {
    return this.state.products.map(product => {
      return (
        <Product
          key={product.ID}
          product={product} />
      )
    })
  }
}

export default Products
