import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNew } from '../../../../lib/bcorpProduct'
import style from './ProductScrollerProduct.scss'

class ProductScrollerProduct extends Component {
  constructor (props) {
    super(props)

    this.renderImage = this.renderImage.bind(this)
    this.renderNew = this.renderNew.bind(this)
    this.renderSKU = this.renderSKU.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
  }

  renderNew () {
    if (isNew(this.props.product.meta['product_new_until'])) {
      return (
        <span
          className={style.new}>
          {'NEW'}
        </span>
      )
    }
  }

  renderImage () {
    const imgStyle = {
      backgroundImage: `url(${this.props.product.media['featured_image'][0]})`
    }
    return (
      <div
        className={style.image}
        style={imgStyle} />
    )
  }

  renderSKU () {
    return (
      <span
        className={style.sku}>
        {this.props.product.meta['product_sku']}
      </span>

    )
  }

  renderTitle () {
    return (
      <span
        className={style.title}>
        {this.props.product.post['post_title']}
      </span>
    )
  }

  render () {
    return (
      <div
        className={style.productScrollerProduct}>

        <div
          className={style.topIcons}>
          {this.renderNew()}
        </div>
        <div
          className={style.elementWrapper}>
          {this.renderImage()}
        </div>
        <div
          className={style.elementWrapper}>
          {this.renderSKU()}
        </div>
        <div
          className={style.elementWrapper}>
          {this.renderTitle()}
        </div>
      </div>

    )
  }
}

ProductScrollerProduct.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductScrollerProduct
