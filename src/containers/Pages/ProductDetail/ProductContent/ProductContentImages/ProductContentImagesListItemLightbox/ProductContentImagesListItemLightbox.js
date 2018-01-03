import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImagesListItemLightbox.scss'

class ProductContentImagesListItemLightbox extends Component {
  render () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }
    return (
      <div
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItem} />
    )
  }
}

ProductContentImagesListItemLightbox.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired
}

export default ProductContentImagesListItemLightbox
