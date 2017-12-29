import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabCaseStudies.scss'

class TabCaseStudies extends Component {
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
      <div
        className={[style.tabCaseStudies, tabStyle.fullWidthColDesktopTab].join(' ')} >
        <h5
          className={tabStyle.tabColTitle}>
          {'Case Studies'}
        </h5>
        {this.renderCaseStudies()}
      </div>
    )
  }
}

TabCaseStudies.propTypes = {
  caseStudies: PropTypes.array.isRequired
}

export default TabCaseStudies
