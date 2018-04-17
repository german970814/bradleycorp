// @flow
import * as React from 'react'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import style from './RightSidebarTemplate.scss'
import defaultStyle from '../Templates.scss'

type Props = {
  /**
   * The page template data
   */
  data: {
    page_title: string
  },
  /**
   * A render function for the modules
   */
  renderModules: () => React.Node,
  /**
   * A render function for the widgets
   */
  renderRightSidebarWidgets: () => React.Node
};

class RightSidebarTemplate extends React.Component<Props> {
  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.RightSidebarTemplate
        }`}>
        {renderTitle(this.props.data.page_title, 'col1')}

        <div className={`col1 col3x2-desktop ${style.content}`}>
          {this.props.renderModules()}
        </div>

        <div className={`col1 col3-desktop ${style.sidebar}`}>
          {this.props.renderRightSidebarWidgets()}
        </div>
      </div>
    )
  }
}

export default RightSidebarTemplate
