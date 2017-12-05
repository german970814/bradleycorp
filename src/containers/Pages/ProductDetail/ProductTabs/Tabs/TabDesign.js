import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabDesign extends Component {
  render() {
    return (
      <div>Design</div>
    )
  }
}

TabDesign.propTypes = {
  videos: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired,
}

export default TabDesign
