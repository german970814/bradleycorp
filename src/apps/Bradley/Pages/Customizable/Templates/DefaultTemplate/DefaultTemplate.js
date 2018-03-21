import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './DefaultTemplate.scss'

class DefaultTemplate extends Component {
  renderTitle () {
    return (
      <div className={style.pageTitle}>
        <h1
          dangerouslySetInnerHTML={{
            __html: this.props.data.page_title
          }} />
      </div>
    )
  }

  render () {
    return (
      <div className={style.defaultTemplate}>
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
