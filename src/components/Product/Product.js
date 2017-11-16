import React, { Component } from 'react'
import ProductApiClient from '../../api/product_client'
import style from './Product.scss'

class Product extends Component {
  constructor(props){
    super(props)

    this.state = {
      products: []
    }

    this.renderProducts = this.renderProducts.bind(this)
  }

  componentDidMount() {

    return getProducts()
      .then( products => {
        this.setState({ products: products.data.posts })
      })
      .catch( err => {
        console.log(err)
      })
  }

  renderProducts() {

    return this.state.products.map( product => {
      return (
        <li key={product.ID}>
          <h1>{product["post_title"]}</h1>
          <p>{product["post_content"]}</p>
        </li>
      )
    })
  }

  render() {

    return (
      <ul>
        {this.renderProducts()}
      </ul>
    )
  }
}

function getProduct() {
  let productApiClient = new ProductApiClient()
  return productApiClient.getById(9)
}

function getProducts() {
  let productApiClient = new ProductApiClient()
  return productApiClient.get()
}

export default Product
