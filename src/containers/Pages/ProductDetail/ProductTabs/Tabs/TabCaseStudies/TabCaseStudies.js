import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabCaseStudiesDesktop from './TabCaseStudiesDesktop'

class TabCaseStudies extends Component {
  render () {
    return (
      <TabCaseStudiesDesktop
        caseStudies={this.props.caseStudies} />
    )
  }
}

TabCaseStudies.propTypes = {
  caseStudies: PropTypes.array.isRequired
}

export default TabCaseStudies
