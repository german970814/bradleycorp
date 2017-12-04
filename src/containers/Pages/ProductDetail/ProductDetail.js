import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductApiClient from '../../../api/product_client'
import ProductDetailException from '../../../exceptions/ProductDetailException'
import ProductContent from './ProductContent/ProductContent'
// import style from './ProductDetail.scss'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: {
        post: {
          'post_title': '',
          'post_content': ''
        },
        meta: {
          'product_media': {
            'images': []
          }
        },
        terms: {},
        media: {
          'featured_image': []
        }
      }
    }

    this.getProductInfo = this.getProductInfo.bind(this)
  }

  componentDidMount () {
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
        <ProductContent
          title={this.state.product.post['post_title']}
          content={this.state.product.post['post_content']}
          imgSrc={this.state.product.media['featured_image'][0]} />
      </section>
    )
  }

  async getProductInfo () {
    try {
      const productSlug = this.props.match.params.slug
      const product = await getProductBySlug(productSlug)

      return this.setState({ product: product.data })
    } catch (err) {
      console.log(new ProductDetailException(err))
    }
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
