// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../types/post_types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../bcorpUrl'
import { isNew } from '../../../bcorpPost'
import style from './ProductScrollerProduct.scss'

type Props = {
  product: BCorpPost,
  className?: string
}

class ProductScrollerProduct extends Component<Props> {
  renderNew () {
    if (isNew(this.props.product.meta['product_new_until'] || '')) {
      return <h6 className={style.new}>{'NEW'}</h6>
    }
  }

  renderImage () {
    const src =
      (this.props.product.media &&
        this.props.product.media['featured_image'] &&
        this.props.product.media['featured_image'].length &&
        this.props.product.media['featured_image'][0]) ||
      ''
    const imgStyle = {
      backgroundImage: `url('${src}')`
    }
    return <div className={style.image} style={imgStyle} />
  }

  renderSKU () {
    return (
      <span className={`small-body ${style.sku}`}>
        {this.props.product.meta['product_sku']}
      </span>
    )
  }

  renderTitle () {
    return (
      <h6 className={style.title}>{this.props.product.post['post_title']}</h6>
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
              <img src={iconSrc} className={style.complianceIcon} />
            </span>
          )
          _icons.push(__i)
        }
        _i++
      }
      return <span className={style.compliance}>{_icons}</span>
    }
  }

  render () {
    return (
      <div
        className={`${style.productScrollerProduct} ${this.props.className ||
          ''}`}>
        <Link to={`${createCPTUrl(this.props.product.post) || ''}`}>
          <div className={style.topIcons}>
            {this.renderNew()}
            {this.renderCompliance()}
          </div>
          <div className={style.elementWrapper}>{this.renderImage()}</div>
          <div className={style.elementWrapper}>{this.renderSKU()}</div>
          <div className={style.elementWrapper}>{this.renderTitle()}</div>
        </Link>
      </div>
    )
  }

  getIconSrc (compliance: string) {
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

export default ProductScrollerProduct
