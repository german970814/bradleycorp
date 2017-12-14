import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabComplianceDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderCompliance = this.renderCompliance.bind(this)
  }

  renderCompliance () {
    return this.props.compliance.map((compliance, index) => {
      return (
        <li
          key={index} >
          {compliance.name}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderCompliance()}
      </div>
    )
  }
}

TabComplianceDesktop.propTypes = {
  compliance: PropTypes.array.isRequired
}

export default TabComplianceDesktop
