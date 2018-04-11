// @flow
import * as React from 'react'
import style from './BCorpWidget.scss'

type Props = {
  children: React.Node,
  title: string,
  className?: string
}

/**
 * Base class for all widgets to compose
 *
 * This component contains the core functionality and layout that all widgets must share
 * namely, the title and the content box
 *
 * When creating a widget...
 * extend this component using composition,
 * whatever is given to this component as children will be displayed in the content box
 */
class BCorpWidget extends React.Component<Props> {
  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h4 className={style.title}>{title}</h4>
  }

  render () {
    return (
      <div className={`${style.widget} ${this.props.className || ''}`}>
        {this.renderTitle()}

        <div className={`${style.contentBox}`}>{this.props.children}</div>
      </div>
    )
  }
}

export default BCorpWidget
