import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabWarrantyDesktop from './TabWarrantyDesktop'

class TabWarranty extends Component {
  render () {
    return (
      <TabWarrantyDesktop
        warranty={this.props.warranty} />
    )
  }
}

TabWarranty.propTypes = {
  warranty: PropTypes.array.isRequired
}

export default TabWarranty
