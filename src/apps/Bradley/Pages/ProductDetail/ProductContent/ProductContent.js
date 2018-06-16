// @flow
import * as React from 'react'
import type { RouterHistory } from 'react-router-dom'
import type { ScreenSize } from '../../../../../lib/contexts/ScreenSizeContext'
import { withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { withScreenSize } from '../../../../../lib/contexts/ScreenSizeContext'
import Loading from '../../../../../lib/components/Loading/Loading'
import { isNew } from '../../../../../lib/bcorpPost'
import ProductContentText from './ProductContentText/ProductContentText'
import ProductContentImages from './ProductContentImages/MobileTablet/ProductContentImagesMobileTablet'
import style from './ProductContent.scss'

/*
  Only need to load the desktop version of the image slider when they need it
 */
const ProductContentImagesDesktopLoadable = Loadable({
  loader: () =>
    import('./ProductContentImages/Desktop/ProductContentImagesDesktop'),
  loading: Loading
})

type Props = {
  title: string,
  content?: string,
  featuredImageSrc?: string,
  images?: string,
  videos?: string,
  newUntil?: string,
  awards?: Array<string>,
  sku?: string,
  cta?:
    | {
        survey_btn: '1' | '0',
        submittal_btn: '1' | '0'
      }
    | '',
  // from withRouter HOC
  history: RouterHistory,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

/*
  The top section of the Product Detail page
  Contains the page up until the tabs
 */
class ProductContent extends React.Component<Props> {
  renderNew () {
    if (this.props.newUntil && isNew(this.props.newUntil)) {
      return <h6 className={style.new}>NEW!</h6>
    }
  }

  renderSKU () {
    if (this.props.sku) {
      return <h6 className={style.sku}>{`MODEL ${this.props.sku}`}</h6>
    }
  }

  renderAwards () {
    if (this.props.awards && this.props.awards.length) {
      const awardsSrcList = this.props.awards[0].split(',')
      return awardsSrcList.map((awardSrc, index) => {
        if (awardSrc !== '') {
          return (
            <div key={index} className={style.award}>
              <img src={awardSrc} />
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
    if (
      this.props.cta['submittal_btn'] &&
      this.props.cta['submittal_btn'] === '1'
    ) {
      const styleClass = desktop
        ? style.submittalBtnDesktop
        : style.productDetailBtn

      buttons = [
        ...buttons,
        <div key={1} className={wrapperStyle}>
          <button
            className={styleClass}
            onClick={() => {
              this.props.history.push({ pathname: '/techdata' })
            }}>
            ADD TO SUBMITTAL
          </button>
        </div>
      ]
    }
    if (this.props.cta['survey_btn'] && this.props.cta['survey_btn'] === '1') {
      const styleClassSurvey = desktop
        ? style.surveyBtnDesktop
        : style.productDetailBtn

      buttons = [
        ...buttons,
        <div key={2} className={`${wrapperStyle} ${style.surveyWrapper}`}>
          <button
            className={`button-border-slate-grey ${styleClassSurvey}`}
            onClick={() => {
              this.props.history.push({
                pathname: '/safety-shower-eyewash-site-survey'
              })
            }}>
            REQUEST SITE SURVEY
          </button>
        </div>
      ]
    }
    return buttons
  }

  renderDesktop () {
    return (
      <div className={style.productContentDesktop}>
        <div className={style.detailsDesktop}>
          {this.renderNew()}
          {this.renderSKU()}

          <h1 className={style.titleDesktop}>{this.props.title}</h1>

          <ProductContentText content={this.props.content} />
          {this.renderAwards()}
        </div>
        <div className={style.imageSelectorDesktop}>
          <ProductContentImagesDesktopLoadable
            featuredImageSrc={this.props.featuredImageSrc}
            images={this.props.images}
            videos={this.props.videos}
          />
        </div>
        <div className={`row ${style.ctaButtons}`}>{this.renderCTA(true)}</div>
      </div>
    )
  }

  renderTablet () {
    return (
      <div className={style.productContent}>
        <div className={style.details}>
          {this.renderNew()}
          {this.renderSKU()}
          <h1 className={style.title}>{this.props.title}</h1>

          <div className={style.imageSelector}>
            <ProductContentImages
              featuredImageSrc={this.props.featuredImageSrc}
              images={this.props.images}
              videos={this.props.videos}
            />
          </div>

          <ProductContentText content={this.props.content} />

          {this.renderAwards()}
          <div className={`row ${style.ctaButtons}`}>{this.renderCTA()}</div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.screenSize === 'tablet' ||
        this.props.screenSize === 'mobile'
          ? this.renderTablet()
          : this.renderDesktop()}
      </div>
    )
  }
}

export default withRouter(withScreenSize(ProductContent))
