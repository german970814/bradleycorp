import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './RightSidebarTemplate.scss'
import defaultStyle from '../Templates.scss'

class RightSidebarTemplate extends Component {
  renderTitle () {
    if (!this.props.data.page_title) {
      return
    }

    return (
      <div className={`col1 ${defaultStyle.pageTitle}`}>
        <h1>{this.props.data.page_title}</h1>
      </div>
    )
  }

  render () {
    return (
      <div className={`row ${defaultStyle.defaultTemplate} ${style.RightSidebarTemplate}`}>

        {this.renderTitle()}

        <div className={`col1 col3x2-desktop ${style.content}`} >
          {this.props.renderModules()}
        </div>

        <div className={`col1 col2-tablet col3-desktop ${style.sidebar}`} >
          {this.props.renderRightSidebarWidgets()}
        </div>

      </div>
    )
  }
}

RightSidebarTemplate.propTypes = {
  /**
   * Only requires 'page_title' to feature on the data object
   */
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  renderRightSidebarWidgets: PropTypes.func.isRequired
}

export default RightSidebarTemplate
