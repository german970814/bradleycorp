import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImagesListItem.scss'

class ProductContentImagesListItem extends Component {
  renderImage () {
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

  renderVideo () {
    const imageStyle = {
      backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@2x.png')})`
    }
    return (
      <div
        style={imageStyle}
        className={style.listItemVideo} />
    )
  }

  render () {
    if (this.props.video) {
      return this.renderVideo()
    }
    return this.renderImage()
  }
}

ProductContentImagesListItem.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  video: PropTypes.bool
}

export default ProductContentImagesListItem
