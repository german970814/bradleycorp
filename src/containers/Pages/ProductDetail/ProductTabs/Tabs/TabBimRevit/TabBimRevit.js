import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabBimRevitDesktop from './TabBimRevitDesktop'

class TabBimRevit extends Component {
  render () {
    return (
      <TabBimRevitDesktop
        bimRevit={this.props.bimRevit} />
    )
  }
}

TabBimRevit.propTypes = {
  bimRevit: PropTypes.array.isRequired
}

export default TabBimRevit
