import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabApplicationGallery extends Component {
  render () {
    return (
      <div>ApplicationGallery</div>
    )
  }
}

TabApplicationGallery.propTypes = {
  appGallery: PropTypes.array.isRequired
}

export default TabApplicationGallery
