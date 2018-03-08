import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FullWidthTemplate extends Component {
  render () {
    return (
      <div>
        {this.props.renderModules()}
      </div>
    )
  }
}

FullWidthTemplate.propTypes = {
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  renderWidgets: PropTypes.func.isRequired
}

export default FullWidthTemplate
