import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProductContentImagesListItem extends Component {
  render () {
    return (
      <img
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        src={this.props.src} />
    )
  }
}

ProductContentImagesListItem.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired
}

export default ProductContentImagesListItem
