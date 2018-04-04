import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './BCorpWidget.scss'

/**
 * Base class for all widgets to extend
 *
 * This component contains the core functionality and layout that all widgets must share
 * namely, the title and the content box
 *
 * When creating a widget...
 * extend this class,
 * use renderContentBox as you would use render, you need only worry about the widgets' actual content
 * call super.render in the render function
 *
 * @extends Component
 */
class BCorpWidget extends Component {
  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h4 className={style.title}>{title}</h4>
  }

  renderContentBox () {}

  render () {
    return (
      <div className={`${style.widget} ${this.props.className}`}>
        {this.renderTitle()}

        <div className={`${style.contentBox}`}>{this.renderContentBox()}</div>
      </div>
    )
  }
}

BCorpWidget.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
}

export default BCorpWidget
