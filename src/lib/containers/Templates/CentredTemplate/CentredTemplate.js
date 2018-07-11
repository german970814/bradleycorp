// @flow
import * as React from 'react'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import style from './CentredTemplate.scss'
import defaultStyle from '../Templates.scss'

/**
 * Defines a layout with a content area
 * which is centred horizontally within the page,
 * and does not fill the width
 */

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string
  },
  /**
   * A render function for the modules
   */
  renderModules: () => React.Node,
  hideTitle?: boolean
}

class CentredTemplate extends React.Component<Props> {
  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.CentredTemplate
        }`}>
        {this.props.hideTitle
          ? null
          : renderTitle(this.props.data.page_title, 'col1')}

        <div className={`col1 ${style.content}`}>
          {this.props.renderModules()}
        </div>
      </div>
    )
  }
}

export default CentredTemplate
