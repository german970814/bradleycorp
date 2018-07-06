// @flow
import * as React from 'react'
import type { BCorpPageTemplateData } from '../../../../types/customPage_types'
import FullWidthTemplate from '../FullWidthTemplate'
import ContentTransformer from '../../../../components/ContentTransformer/ContentTransformer'
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
        <div className={`col1 ${style.logoWrapper}`}>
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

    return (
      description && (
        <div className={`col1 ${style.description}`}>
          <ContentTransformer content={description} />
        </div>
      )
    )
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
      <div className={`col1 ${style.titleWrapper}`}>
        <h4 className={style.title}>{title}</h4>
      </div>
    )
  }

  renderProductLandingPageArea () {
    return (
      <div className={`row ${style.productLandingPage}`}>
        <div className={`col1 ${style.titleImageWrapper}`}>
          {this.renderTitle()}
          {this.renderProductImage()}
        </div>
        <div className={`col1 ${style.descriptionLogoWrapper}`}>
          {this.renderDescription()}
          {this.renderLogo()}
        </div>
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
