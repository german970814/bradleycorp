import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from "react-media"
import ProductContentText from './ProductContentText/ProductContentText'
import ProductContentImages from './ProductContentImages/ProductContentImages'
import ProductContentImagesDesktop from './ProductContentImages/ProductContentImagesDesktop'
import style from './ProductContent.scss'

class ProductContent extends Component {
  constructor (props) {
    super(props)

    this.renderNew = this.renderNew.bind(this)
    this.rendeerSKU = this.renderSKU.bind(this)
    this.renderAwards = this.renderAwards.bind(this)
    this.renderCTA = this.renderCTA.bind(this)
    this.renderDesktop = this.renderDesktop.bind(this)
    this.renderTablet = this.renderTablet.bind(this)
    this.isNew = this.isNew.bind(this)
  }

  renderNew () {
    if (this.isNew()) {
      return (
        <span
          className={style.new}>
          NEW!
        </span>
      )
    }
  }

  renderSKU () {
    if (this.props.sku) {
      return (
        <span
          className={style.sku}>
          {`MODEL ${this.props.sku}`}
        </span>
      )
    }
  }

  renderAwards () {
    if (this.props.awards.length > 0) {
      const awardsSrcList = this.props.awards[0].split(',')
      return awardsSrcList.map((awardSrc, index) => {
        return (
          <div
            key={index}
            className={style.award}>
            <img src={awardSrc}></img>
          </div>
        )
      })
    }
  }

  renderCTA () {
    if (!this.props.cta) {
      return
    }

    let buttons = []
    if (this.props.cta['submittal_btn']) {
      buttons = [ ...buttons,
        <button
          key={1}
          className={style.submittalBtn} >
          ADD TO SUBMITTAL
        </button>
      ]
    }
    if (this.props.cta['survey_btn']) {
      buttons = [ ...buttons,
        <button
          key={2}
          className={style.surveyBtn} >
          REQUEST SITE SURVEY
        </button>
      ]
    }
    return buttons
  }

  renderDesktop () {
    return (
      <div
        className={style.productContentDesktop}>
        <div
          className={style.details}>
          {this.renderNew()}
          {this.renderSKU()}
          <h1
            className={style.title}>
            {this.props.title}</h1>
          <ProductContentText
            content = {this.props.content} />
          {this.renderAwards()}
          {this.renderCTA()}
        </div>
        <div
          className={style.image}>
          <ProductContentImagesDesktop
            featuredImageSrc= {this.props.featuredImageSrc}
            images = {this.props.images} />
        </div>
      </div>
    )
  }

  renderTablet() {
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
            className={style.image}>
            <ProductContentImages
              featuredImageSrc= {this.props.featuredImageSrc}
              images = {this.props.images} />
          </div>
          <ProductContentText
            content = {this.props.content} />
          {this.renderAwards()}
          {this.renderCTA()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Media query={{ maxWidth: 768 }}>
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

  isNew () {
    const newUntil = new Date(this.props.newUntil)
    const now = new Date()
    return newUntil - now > 0
  }
}

ProductContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string,
  newUntil: PropTypes.string,
  awards: PropTypes.array,
  sku: PropTypes.string,
  cta: PropTypes.object
}

export default ProductContent
