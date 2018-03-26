import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultStyle from '../Templates.scss'

class DefaultTemplate extends Component {
  renderTitle () {
    return (
      <div className={defaultStyle.pageTitle}>
        <h1>{this.props.data.page_title}</h1>
      </div>
    )
  }

  render () {
    return (
      <div className={defaultStyle.defaultTemplate}>
        {this.renderTitle()}
        {this.props.renderModules()}
      </div>
    )
  }
}

DefaultTemplate.propTypes = {
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  renderWidgets: PropTypes.func.isRequired
}

export default DefaultTemplate
