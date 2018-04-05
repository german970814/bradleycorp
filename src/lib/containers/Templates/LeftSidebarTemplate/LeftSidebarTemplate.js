// @flow
import * as React from 'react'
// import style from './LeftSidebarTemplate.scss'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'

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
  renderModules: () => React.Node
}

class LeftSidebarTemplate extends React.Component<Props> {
  render () {
    return renderTitle(this.props.data.page_title)
  }
}

export default LeftSidebarTemplate
