// @flow
import * as React from 'react'
import type { Widget } from '../../../types/widget_types'
import { sitePrettyName } from '../../../../api'
import WidgetsClient from '../../../../api/widgets_client'
import WidgetBuilder from '../../Widgets/WidgetBuilder'
import RightSidebarTemplate from '../../Templates/RightSidebarTemplate/RightSidebarTemplate'

type Props = {
  renderContent: () => React.Node
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
            page_title: sitePrettyName
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

export default BlogPageTemplate
