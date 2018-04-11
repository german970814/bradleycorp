// @flow
import React, { Component } from 'react'
import type { Widget } from '../../types/widget_types'
import WidgetFactory from './WidgetFactory'

type Props = {
  widgetClass?: string,
  /**
   * Array of data for all widgets in the given widget area,
   */
  widgetData: Array<Widget>,
  /**
   * The page path, so we know when to re run the whole build sequence
   */
  pagePath: string,
  /**
   * Set true if you're using a right sidebar template to render the widget
   * and you want it to split into two columns for a tablet sized screen
   */
  twoColsOnTablet?: boolean
}

/**
 * This is the main entry point for rendering widgets,
 * if you need widgets, you'll need to use this component and pass it the widgets data
 */
class WidgetBuilder extends Component<Props> {
  renderWidgets () {
    const { widgetData } = this.props

    return widgetData.map((widgetData, index) => {
      return (
        <WidgetFactory
          key={index}
          widgetClass={this.props.widgetClass}
          type={widgetData.type}
          data={widgetData.data}
          twoColsOnTablet={this.props.twoColsOnTablet}
        />
      )
    })
  }

  render () {
    if (!this.props.widgetData) {
      return null
    }

    return this.renderWidgets()
  }
}

export default WidgetBuilder
