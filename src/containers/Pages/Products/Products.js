import React, { Component } from 'react'
import ProductApiClient from '../../../api/product_client'
import Product from '../../../components/Product/Product'
// import style from './Products.scss'

class Products extends Component {
  constructor (props) {
    super(props)

    this.state = {
      products: []
    }

    this.renderProducts = this.renderProducts.bind(this)
  }

  componentDidMount () {
    return getProducts()
      .then(products => {
        this.setState({ products: products.data.posts })
      })
      .catch(err => {
        console.log(err)
      })
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

  render () {
    return (
      <ul>
        {this.renderProducts()}
      </ul>
    )
  }
}

function getProducts () {
  const productApiClient = new ProductApiClient()
  return productApiClient.get()
}

export default Products
