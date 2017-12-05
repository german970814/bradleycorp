import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabBimRevit extends Component {
  render() {
    return (
      <div>BimRevit</div>
    )
  }
}

TabBimRevit.propTypes = {
  bimRevit: PropTypes.array.isRequired
}

export default TabBimRevit
