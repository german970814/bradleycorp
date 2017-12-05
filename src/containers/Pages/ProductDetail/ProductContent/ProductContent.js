import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductContentText from './ProductContentText/ProductContentText'
import ProductContentImages from './ProductContentImages/ProductContentImages'
import style from './ProductContent.scss'

class ProductContent extends Component {
  constructor (props) {
    super(props)

    this.renderNew = this.renderNew.bind(this)
    this.rendeerSKU = this.renderSKU.bind(this)
    this.renderAwards = this.renderAwards.bind(this)
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

  render () {
    return (
      <div
        className={style.productContent}>
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
        </div>
        <div
          className={style.image}>
          <ProductContentImages
            featuredImageSrc= {this.props.featuredImageSrc}
            images = {this.props.images} />
        </div>
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
  sku: PropTypes.string
}

export default ProductContent
