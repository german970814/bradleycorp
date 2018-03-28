import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WidgetFactory from './WidgetFactory'

class WidgetBuilder extends Component {
  renderWidgets () {
    const { widgetData } = this.props

    return widgetData.map((widgetData, index) => {
      return <WidgetFactory key={index} type={widgetData.type} data={widgetData.data} />
    })
  }

  render () {
    if (!this.props.widgetData) {
      return null
    }

    return this.renderWidgets()
  }
}

WidgetBuilder.propTypes = {
  /**
   * Array of data for all widgets in the given widget area
   *
   * @type {[Object]}
   */
  widgetData: PropTypes.array,
  /**
   * The page slug, so we know when to re run the whole build sequence
   *
   * @type {[string]}
   */
  pageSlug: PropTypes.string
}

export default WidgetBuilder
