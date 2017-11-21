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

    this.getProductInfo = this.getProductInfo.bind(this)
  }

  componentWillMount () {
    this.getProductInfo()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.getProductInfo()
    }
  }

  render () {
    return (
      <section>
        <h1>{this.state.product['post_title']}</h1>
        <p>{this.state.product['post_content']}</p>
      </section>
    )
  }

  getProductInfo () {
    const productSlug = this.props.match.params.slug

    return getProductBySlug(productSlug)
      .then(product => {
        return this.setState({ product: product.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

ProductDetail.propTypes = {
  match: PropTypes.object.isRequired
}

function getProductBySlug (slug) {
  const productApiClient = new ProductApiClient()
  return productApiClient.getBySlug(slug)
}

export default ProductDetail
