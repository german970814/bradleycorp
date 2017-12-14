import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabApplicationGalleryDesktop from './TabApplicationGalleryDesktop'

class TabApplicationGallery extends Component {
  render () {
    return (
      <TabApplicationGalleryDesktop
        applicationGalleries={this.props.applicationGalleries} />
    )
  }
}

TabApplicationGallery.propTypes = {
  applicationGalleries: PropTypes.array.isRequired
}

export default TabApplicationGallery
