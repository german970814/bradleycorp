import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WidgetFactory from './Widgets/WidgetFactory'

class WidgetBuilder extends Component {
  renderWidgets () {
    const widgets = this.props.widgetData[this.props.widgetArea]

    return widgets.map((widgetData, index) => {
      return <WidgetFactory key={index} type={widgetData.type} data={widgetData.data} />
    })
  }

  render () {
    if (!this.props.widgetData || !this.props.widgetData[this.props.widgetArea]) {
      return null
    }

    return this.renderWidgets()
  }
}

WidgetBuilder.propTypes = {
  /**
   * The widget area to build widgets for
   *
   * @type {[string]}
   */
  widgetArea: PropTypes.string.isRequired,
  /**
   * Data for all widgets in all widget areas
   *
   * @type {[Object]}
   */
  widgetData: PropTypes.object,
  /**
   * The page slug, so we know when to re run the whole build sequence
   *
   * @type {[string]}
   */
  pageSlug: PropTypes.string
}

export default WidgetBuilder
