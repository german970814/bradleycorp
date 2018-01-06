import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayerLightbox from '../../../../../../components/Partials/Youtube/YoutubePlayerLightbox/YoutubePlayerLightbox'
import style from './ProductContentImagesListItemLightbox.scss'

class ProductContentImagesListItemLightbox extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`,
      height: this.props.style.height
    }

    return (
      <div
        style={imageStyle}
        className={style.listItemLightbox} />
    )
  }

  renderVideo () {
    return (
      <YoutubePlayerLightbox
        src={this.props.src}
        maxWidth={0.8}
        maxWidthTablet={0.8} />
    )
  }

  render () {
    if (this.props.video) {
      return this.renderVideo()
    }
    return this.renderImage()
  }
}

ProductContentImagesListItemLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  video: PropTypes.bool
}

export default ProductContentImagesListItemLightbox
