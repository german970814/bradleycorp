import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabThreePartSpecAndTechDataDesktop from './TabThreePartSpecAndTechDataDesktop'

class TabThreePartSpecAndTechData extends Component {
  render () {
    return (
      <TabThreePartSpecAndTechDataDesktop
        threePartSpec={this.props.threePartSpec}
        technicalData={this.props.technicalData} />
    )
  }
}

TabThreePartSpecAndTechData.propTypes = {
  threePartSpec: PropTypes.array.isRequired,
  technicalData: PropTypes.array.isRequired
}

export default TabThreePartSpecAndTechData
