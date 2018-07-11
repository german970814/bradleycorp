// @flow
import * as React from 'react'
import type { Widget } from '../../../../types/widget_types'
import type { OptionsType } from '../../../../contexts/OptionsContext'
import { withOptions } from '../../../../contexts/OptionsContext'
import WidgetsClient from '../../../../../api/widgets_client'
import WidgetBuilder from '../../../Widgets/WidgetBuilder'
import RightSidebarTemplate from '../../RightSidebarTemplate/RightSidebarTemplate'

/**
 * All blog pages use the same right sidebar template with the same sidebar.
 *
 * To wrap this logic and avoid having to ever rerender the sidebar
 * on each change of route,
 * we define this template which composes the RightSidebarTemplate
 * and gets the sidebar only on componentDidMount.
 *
 * If all blog pages compose this template, then only the content section
 * will ever have to update.
 *
 * Note the title of the blog always remains the same at the top,
 * regardless of the page,
 * and this is set in the CMS.
 */

type Props = {
  renderContent: () => React.Node,
  // from withOptions
  options: OptionsType
}

type State = {
  widgets: Array<Widget>
}

class BlogPageTemplate extends React.Component<Props, State> {
  defaultWidgetState: Widget
  defaultState: State

  constructor (props: Props) {
    super(props)

    this.defaultWidgetState = {
      type: '',
      data: {
        title: 'Loading Widget...'
      }
    }

    this.defaultState = {
      widgets: [this.defaultWidgetState]
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    this.getWidgets()
  }

  render () {
    return (
      <div className={`Blog-Page-Template`}>
        <RightSidebarTemplate
          data={{
            page_title: this.props.options.blogname || ''
          }}
          renderModules={this.props.renderContent}
          renderRightSidebarWidgets={() => {
            return (
              <WidgetBuilder widgetData={this.state.widgets} twoColsOnTablet />
            )
          }}
        />
      </div>
    )
  }

  /**
   * Gets the widgets and merges them with state,
   * keeping any required defaults that aren't included in the data
   */
  async getWidgets () {
    try {
      const response = await WidgetsClient.getBlogSidebar()
      const widgetsData: Array<Widget> = response.data

      const widgets = widgetsData.map(widgetData => {
        return Object.assign({}, this.defaultWidgetState, widgetData)
      })

      return this.setState({ widgets })
    } catch (err) {
      console.log(err)
    }
  }
}

export default withOptions(BlogPageTemplate)
