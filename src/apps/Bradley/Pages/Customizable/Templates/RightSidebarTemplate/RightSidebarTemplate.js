import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './RightSidebarTemplate.scss'
import defaultStyle from '../Templates.scss'

class RightSidebarTemplate extends Component {
  renderTitle () {
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

        <div className={`col3x2 ${style.content}`} >
          {this.props.renderModules()}
        </div>

        <div className={`col3 ${style.sidebar}`} >
          {this.props.renderWidgets()}
        </div>

      </div>
    )
  }
}

RightSidebarTemplate.propTypes = {
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  renderWidgets: PropTypes.func.isRequired
}

export default RightSidebarTemplate
