import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import Loading from '../../../../../lib/components/Loading/Loading'
import Media from 'react-media'
import { TABLETMAXWIDTH } from '../../../../../globals'
import { isNew } from '../../../../../lib/bcorpPost'
import ProductContentText from './ProductContentText/ProductContentText'
import ProductContentImages from './ProductContentImages/MobileTablet/ProductContentImagesMobileTablet'
import style from './ProductContent.scss'

/*
  Only need to load the desktop version of the image slider when they need it
 */
const ProductContentImagesDesktopLoadable = Loadable({
  loader: () => import('./ProductContentImages/Desktop/ProductContentImagesDesktop'),
  loading: Loading
})

/*
  The top section of the Product Detail page
  Contains the page up until the tabs
 */
class ProductContent extends Component {
  renderNew () {
    if (isNew(this.props.newUntil)) {
      return (
        <h6
          className={style.new}>
          NEW!
        </h6>
      )
    }
  }

  renderSKU () {
    if (this.props.sku) {
      return (
        <h6
          className={style.sku}>
          {`MODEL ${this.props.sku}`}
        </h6>
      )
    }
  }

  renderAwards () {
    if (this.props.awards.length) {
      const awardsSrcList = this.props.awards[0].split(',')
      return awardsSrcList.map((awardSrc, index) => {
        if (awardSrc !== '') {
          return (
            <div
              key={index}
              className={style.award}>
              <img src={awardSrc}></img>
            </div>
          )
        }
      })
    }
  }

  renderCTA (desktop) {
    if (!this.props.cta) {
      return
    }

    const wrapperStyle = desktop
      ? style.buttonWrapperDesktop
      : `col1 col2-tablet ${style.buttonWrapper}`

    let buttons = []
    if (this.props.cta['submittal_btn'] && this.props.cta['submittal_btn'] === '1') {
      const styleClass = desktop
        ? style.submittalBtnDesktop
        : style.productDetailBtn

      buttons = [ ...buttons,
        <div
          key={1}
          className={wrapperStyle} >
          <button
            className={styleClass}
            onClick={() => { this.props.history.push({pathname: '/techdata'}) }}>
            ADD TO SUBMITTAL
          </button>
        </div>
      ]
    }
    if (this.props.cta['survey_btn'] && this.props.cta['survey_btn'] === '1') {
      const styleClassSurvey = desktop
        ? style.surveyBtnDesktop
        : style.productDetailBtn

      buttons = [ ...buttons,
        <div
          key={2}
          className={`${wrapperStyle} ${style.surveyWrapper}`} >
          <button
            className={`button-border-slate-grey ${styleClassSurvey}`} >
            REQUEST SITE SURVEY
          </button>
        </div>
      ]
    }
    return buttons
  }

  renderDesktop () {
    return (
      <div
        className={style.productContentDesktop}>
        <div
          className={style.detailsDesktop}>
          {this.renderNew()}
          {this.renderSKU()}

          <h1
            className={style.titleDesktop}>
            {this.props.title}
          </h1>

          <ProductContentText
            content={this.props.content} />
          {this.renderAwards()}

        </div>
        <div
          className={style.imageSelectorDesktop}>
          <ProductContentImagesDesktopLoadable
            featuredImageSrc={this.props.featuredImageSrc}
            images={this.props.images}
            videos={this.props.videos} />
        </div>
        <div
          className={`row ${style.ctaButtons}`} >
          {this.renderCTA(true)}
        </div>
      </div>
    )
  }

  renderTablet () {
    return (
      <div
        className={style.productContent}>
        <div
          className={style.details}>
          {this.renderNew()}
          {this.renderSKU()}
          <h1
            className={style.title}>
            {this.props.title}
          </h1>

          <div
            className={style.imageSelector}>
            <ProductContentImages
              featuredImageSrc={this.props.featuredImageSrc}
              images={this.props.images}
              videos={this.props.videos} />
          </div>

          <ProductContentText
            content={this.props.content} />

          {this.renderAwards()}
          <div
            className={`row ${style.ctaButtons}`} >
            {this.renderCTA()}
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Media query={{ maxWidth: TABLETMAXWIDTH }}>
          {match =>
            match ? (
              this.renderTablet()
            ) : (
              this.renderDesktop()
            )
          }
        </Media>
      </div>
    )
  }
}

ProductContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string,
  videos: PropTypes.string,
  newUntil: PropTypes.string,
  awards: PropTypes.array,
  sku: PropTypes.string,
  cta: PropTypes.object
}

export default withRouter(ProductContent)
