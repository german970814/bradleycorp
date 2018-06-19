// @flow
import * as React from 'react'
import type { BimProductVariant } from '../../../../api/bradley-apis/documentPackager_client'
import { bradleyApisHost } from '../../../../api/bradley-apis/index'
import { Link } from 'react-router-dom'
import style from './BIMRevitOption.scss'

type Props = {
  productVariant: BimProductVariant,
  toggleSelect: (id: number) => void,
  selected: boolean,
  showProductPageLinks?: boolean
}

class BIMRevitOption extends React.Component<Props> {
  renderTitle () {
    return <h5 className={style.title}>{this.props.productVariant.name}</h5>
  }

  renderCheckbox () {
    const id = this.props.productVariant.id

    return (
      <React.Fragment>
        <input
          className={style.checkbox}
          onChange={() => {
            this.props.toggleSelect(id)
          }}
          type="checkbox"
          value={id}
          id={id}
          checked={this.props.selected || false}
        />
        {this.props.selected && (
          <img
            src={require('../../../../images/check/check@2x.png')}
            className={style.check}
          />
        )}
      </React.Fragment>
    )
  }

  renderImage () {
    return (
      <div className={style.image}>
        <div
          style={{
            backgroundImage: `url('${bradleyApisHost}${
              this.props.productVariant.product.imageUrl
            }')`
          }}
          className={style.imageInner}
        />
      </div>
    )
  }

  renderProductPageLink () {
    if (!this.props.showProductPageLinks) {
      return
    }

    return (
      <Link className={`link-orange ${style.productPage}`} to={'#'}>
        {'PRODUCT PAGE'}
      </Link>
    )
  }

  renderDownloadIcon () {
    return (
      <img
        src={require('../../../../images/download-arrow-icon/download@2x.png')}
        className={style.download}
      />
    )
  }

  render () {
    return (
      <div className={style.BIMRevitOption}>
        {this.renderTitle()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductPageLink()}
        {this.renderDownloadIcon()}
      </div>
    )
  }
}

export default BIMRevitOption
