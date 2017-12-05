import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabWarranty extends Component {
  render () {
    return (
      <div>Warranty</div>
    )
  }
}

TabWarranty.propTypes = {
  warranty: PropTypes.string.isRequired
}

export default TabWarranty
