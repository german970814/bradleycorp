import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabApplicationGalleryDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderApplicationGallery = this.renderApplicationGallery.bind(this)
  }

  renderApplicationGallery () {
    return this.props.applicationGalleries.map((applicationGallery, index) => {
      return (
        <li
          key={index} >
          {applicationGallery.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderApplicationGallery()}
      </div>
    )
  }
}

TabApplicationGalleryDesktop.propTypes = {
  applicationGalleries: PropTypes.array.isRequired
}

export default TabApplicationGalleryDesktop
