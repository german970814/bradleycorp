import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../lib/bcorpUrl'
import { isNew } from '../../../../lib/bcorpProduct'
import style from './ProductScrollerProduct.scss'

class ProductScrollerProduct extends Component {
  constructor (props) {
    super(props)

    this.renderImage = this.renderImage.bind(this)
    this.renderNew = this.renderNew.bind(this)
    this.renderSKU = this.renderSKU.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
    this.renderCompliance = this.renderCompliance.bind(this)
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

  renderCompliance () {
    if (this.props.product.meta['product_compliance']) {
      let _icons = [], _i = 0;
      for (var i in this.props.product.meta['product_compliance']) {
        if ( 3 > _i ){
          const __i = <span
            key={i}
            className={style.complianceIcon}>
            {i}
          </span>;
          _icons.push(__i);
        }
        _i++;
      }
      return (
        <span
          className={style.compliance}>
          {_icons}
        </span>
      )
    }
  }

  render () {
    return (
      <div
        className={style.productScrollerProduct}>

        <Link
          to={`${createCPTUrl(this.props.product.post)}`}
          replace >

          <div
            className={style.topIcons}>
            {this.renderNew()}
            {this.renderCompliance()}
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

        </Link>

      </div>

    )
  }
}

ProductScrollerProduct.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductScrollerProduct
