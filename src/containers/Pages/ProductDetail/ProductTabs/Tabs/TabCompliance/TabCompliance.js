import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabComplianceDesktop from './TabComplianceDesktop'

class TabCompliance extends Component {
  render () {
    return (
      <TabComplianceDesktop
        compliance={this.props.compliance} />
    )
  }
}

TabCompliance.propTypes = {
  compliance: PropTypes.array.isRequired
}

export default TabCompliance
