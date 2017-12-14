import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabMaintenanceDesktop from './TabMaintenanceDesktop'

class TabMaintenance extends Component {
  render () {
    return (
      <TabMaintenanceDesktop
        guides={this.props.guides}
        videos={this.props.videos} />
    )
  }
}

TabMaintenance.propTypes = {
  guides: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired
}

export default TabMaintenance
