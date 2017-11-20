import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from '../../Product/Product'
// import style from './Products.scss'

class Products extends Component {
  constructor (props) {
    super(props)

    this.renderProducts = this.renderProducts.bind(this)
  }

  renderProducts () {
    return this.props.products.map(product => {
      return (
        <Product
          key={product.ID}
          product={product} />
      )
    })
  }

  render () {
    return (
      <ul>
        {this.renderProducts()}
      </ul>
    )
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired
}

export default Products
