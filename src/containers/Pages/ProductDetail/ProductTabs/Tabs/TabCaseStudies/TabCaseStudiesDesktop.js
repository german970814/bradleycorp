import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TabCaseStudiesDesktop extends Component {
  constructor (props) {
    super(props)

    this.renderCaseStudies = this.renderCaseStudies.bind(this)
  }

  renderCaseStudies () {
    return this.props.caseStudies.map((caseStudy, index) => {
      return (
        <li
          key={index} >
          {caseStudy.post['post_title']}
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        {this.renderCaseStudies()}
      </div>
    )
  }
}

TabCaseStudiesDesktop.propTypes = {
  caseStudies: PropTypes.array.isRequired
}

export default TabCaseStudiesDesktop
