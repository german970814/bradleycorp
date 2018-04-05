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
   * The page slug, so we know when to re run the whole build sequence
   */
  pageSlug: string
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
