import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductApiClient from '../../../api/product_client'
import productObjectShape from './productObjectShape'
import ProductDetailException from '../../../exceptions/ProductDetailException'
import ProductContent from './ProductContent/ProductContent'
import ProductTabs from './ProductTabs/ProductTabs'
import style from './ProductDetail.scss'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: productObjectShape
    }

    this.getProductInfo = this.getProductInfo.bind(this)
  }

  componentDidMount () {
    this.getProductInfo(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getProductInfo(nextProps)
    }
  }

  render () {
    return (
      <div
        className={style.productDetailPage}>
        <section
          className={style.content}>
          <ProductContent
            title={this.state.product.post['post_title']}
            content={this.state.product.post['post_content']}
            featuredImageSrc={this.state.product.media['featured_image'][0]}
            images={this.state.product.meta['product_media'].images[0]}
            newUntil={this.state.product.meta['product_new_until']}
            sku={this.state.product.meta['product_sku']}
            awards={this.state.product.meta['product_awards']} />
        </section>

        <section
          className={style.tabs}>
          <ProductTabs
            product={this.state.product} />
        </section>
      </div>

    )
  }

  async getProductInfo (props) {
    try {
      const productSlug = props.match.params.slug
      const product = await this.getProductBySlug(productSlug)

      return this.setState({ product: product.data })
    } catch (err) {
      console.log(new ProductDetailException(err))
    }
  }

  getProductBySlug (slug) {
    const productApiClient = new ProductApiClient()
    return productApiClient.getBySlug(slug)
  }
}

ProductDetail.propTypes = {
  match: PropTypes.object.isRequired
}

export default ProductDetail
