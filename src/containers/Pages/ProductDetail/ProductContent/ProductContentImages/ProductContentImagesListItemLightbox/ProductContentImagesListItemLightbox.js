import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImagesListItemLightbox.scss'

class ProductContentImagesListItemLightbox extends Component {
  render () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`,
      height: this.props.height
    }

    return (
      <div
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItemLightbox} />
    )
  }
}

ProductContentImagesListItemLightbox.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  height: PropTypes.number,
  video: PropTypes.bool
}

export default ProductContentImagesListItemLightbox
