import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../bcorpUrl'
import { isNew } from '../../../bcorpProduct'
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
      <h6
        className={style.title}>
        {this.props.product.post['post_title']}
      </h6>
    )
  }

  renderCompliance () {
    if (this.props.product.meta['product_compliance']) {
      const _icons = []
      let _i = 0
      for (var compliance in this.props.product.meta['product_compliance']) {
        // limit number of icons to 3
        if (_i < 3) {
          const iconSrc = this.getIconSrc(compliance)
          // move on if the icon image doesnt exist or hasn't been assigned
          if (!iconSrc) {
            continue
          }

          const title = `${compliance} Compliant`
          const __i = (
            <span
              key={compliance}
              className={style.complianceIconWrapper}
              title={title}>
              <img
                src={iconSrc}
                className={style.complianceIcon} />
            </span>
          )
          _icons.push(__i)
        }
        _i++
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

  getIconSrc (compliance) {
    switch (compliance) {
      case 'ADA':
        return require('../../../../images/compliance-icons/ada-web-icon@2x.png')

      case 'Barrier Free':
        return require('../../../../images/compliance-icons/bf-web-icon@2x.png')

      case 'Advocate':
        return require('../../../../images/compliance-icons/advocate-web-icon@2x.png')

      case 'Aerix Plus':
        return require('../../../../images/compliance-icons/aerix-plus-web-icon@2x.png')

      case 'Aerix':
        return require('../../../../images/compliance-icons/aerix-web-icon@2x.png')

      case 'Diplomat':
        return require('../../../../images/compliance-icons/diplomat-web-icon@2x.png')

      case 'Frequency':
        return require('../../../../images/compliance-icons/frequency-web-icon@2x.png')

      case 'Halo':
        return require('../../../../images/compliance-icons/halo-web-icon@2x.png')

      case 'Navigator':
        return require('../../../../images/compliance-icons/navigator-web-icon@2x.png')

      case 'Verge':
        return require('../../../../images/compliance-icons/verge-web-icon@2x.png')

      case 'Keltech':
        return require('../../../../images/compliance-icons/keltech-web-icon@2x.png')

      default:
        return false
    }
  }
}

ProductScrollerProduct.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductScrollerProduct
