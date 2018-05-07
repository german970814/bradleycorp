// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../../types/customPage_types'
import FullWidthTemplate from '../FullWidthTemplate'
import style from './ProductLandingPageTemplate.scss'

type Props = {
  data: BCorpPageTemplateData,
  renderModules: () => React.Node,
  pagePath: string
}

class ProductLandingPageTemplate extends React.Component<Props> {
  renderLogo () {
    const logo =
      this.props.data.metaboxes &&
      this.props.data.metaboxes.product_landing_page &&
      this.props.data.metaboxes.product_landing_page.logo

    return (
      logo && (
        <div className={style.logoWrapper}>
          <img src={logo} />
        </div>
      )
    )
  }

  renderDescription () {
    const description =
      this.props.data.metaboxes &&
      this.props.data.metaboxes.product_landing_page &&
      this.props.data.metaboxes.product_landing_page.description

    return description && <div className={style.description}>{description}</div>
  }

  renderProductImage () {
    const productImage =
      this.props.data.metaboxes &&
      this.props.data.metaboxes.product_landing_page &&
      this.props.data.metaboxes.product_landing_page.product_image

    return (
      productImage && (
        <div className={style.productImageWrapper}>
          <img src={productImage} />
        </div>
      )
    )
  }

  renderTitle () {
    const title =
      this.props.data.metaboxes &&
      this.props.data.metaboxes.product_landing_page &&
      this.props.data.metaboxes.product_landing_page.title

    return (
      <div className={style.titleWrapper}>
        <h4 className={style.title}>{title}</h4>
      </div>
    )
  }

  renderProductLandingPageArea () {
    return (
      <div className={style.productLandingPage}>
        {this.renderTitle()}
        {this.renderProductImage()}
        {this.renderDescription()}
        {this.renderLogo()}
      </div>
    )
  }

  renderModules () {
    return (
      <React.Fragment>
        {this.renderProductLandingPageArea()}
        {this.props.renderModules()}
      </React.Fragment>
    )
  }

  render () {
    return (
      <FullWidthTemplate
        data={this.props.data}
        renderModules={this.renderModules.bind(this)}
        pagePath={this.props.pagePath}
      />
    )
  }
}

export default ProductLandingPageTemplate
