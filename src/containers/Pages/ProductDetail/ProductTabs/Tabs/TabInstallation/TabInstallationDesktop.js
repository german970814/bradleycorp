import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabInstallationDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderGuides = this.renderGuides.bind(this)
    this.renderVideos = this.renderVideos.bind(this)
  }

  renderGuides () {
    return this.props.guides.map((guide, index) => {
      return (
        <li
          key={index} >
          {guide['term_id']}
        </li>
      )
    })
  }

  renderVideos () {
    return this.props.videos.map((video, index) => {
      return (
        <li
          key={index} >
          <iframe src={video} />
        </li>
      )
    })
  }

  render () {
    return (
      <div>

        <div>
          <h4>
            {'Guides'}
          </h4>
          <ul>
            {this.renderGuides()}
          </ul>
        </div>

        <div>
          <h4>
            {'Videos'}
          </h4>
          <ul>
            {this.renderVideos()}
          </ul>
        </div>

      </div>
    )
  }
}

TabInstallationDesktop.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabInstallationDesktop
