import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabDesignDesktop from './TabDesignDesktop'

class TabDesign extends Component {
  render () {
    return (
      <TabDesignDesktop
        videos={this.props.videos}
        links={this.props.links}
        literature={this.props.literature}
        colors={this.props.colors} />
    )
  }
}

TabDesign.propTypes = {
  videos: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
}

export default TabDesign
