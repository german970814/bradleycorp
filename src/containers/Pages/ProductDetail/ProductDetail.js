import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductApiClient from '../../../api/product_client'
// import style from './ProductDetail.scss'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: {}
    }

    this.productId = this.props.match.params.id
  }

  componentDidMount () {
    return getProductById(this.productId)
      .then(product => {
        this.setState({ product: product.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <section>
        <h1>{this.state.product['post_title']}</h1>
        <p>{this.state.product['post_content']}</p>
      </section>
    )
  }
}

ProductDetail.propTypes = {
  match: PropTypes.object.isRequired
}

function getProductById ( id ) {
  const productApiClient = new ProductApiClient()
  return productApiClient.getById( id )
}

export default ProductDetail
