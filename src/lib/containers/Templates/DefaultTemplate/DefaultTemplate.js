// @flow
import * as React from 'react'
import defaultStyle from '../Templates.scss'

type Props = {
  data: {
    page_title: string
  },
  renderModules: () => React.Node
};

class DefaultTemplate extends React.Component<Props> {
  render () {
    return (
      <div className={defaultStyle.defaultTemplate}>
        {renderTitle(this.props.data.page_title)}
        {this.props.renderModules()}
      </div>
    )
  }
}

export function renderTitle (title?: string, className?: string): React.Node {
  if (!title) {
    return null
  }

  return (
    <div className={`${className || ''} ${defaultStyle.pageTitle}`}>
      <h1>{title}</h1>
    </div>
  )
}

export default DefaultTemplate
