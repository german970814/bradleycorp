import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabInstallationDesktop from './TabInstallationDesktop'

class TabInstallation extends Component {
  render () {
    return (
      <TabInstallationDesktop
        guides={this.props.guides}
        videos={this.props.videos} />
    )
  }
}

TabInstallation.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabInstallation
