import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductContentText from './ProductContentText/ProductContentText'
import ProductContentImages from './ProductContentImages/ProductContentImages'
import style from './ProductContent.scss'

class ProductContent extends Component {

  render () {
    return (
      <div
        className={style.productContent}>
        <div
          className={style.details}>
          <h1
            className={style.title}>
            {this.props.title}</h1>
          <ProductContentText
            content = {this.props.content} />
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
}

ProductContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string
}

export default ProductContent
