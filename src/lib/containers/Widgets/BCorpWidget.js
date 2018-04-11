// @flow
import * as React from 'react'
import style from './BCorpWidget.scss'

type Props = {
  children: React.Node,
  title: string,
  className?: string,
  /**
   * Set true if you're using a right sidebar template to render the widget
   * and you want it to split into two columns for a tablet sized screen
   */
  twoColsOnTablet?: boolean
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
    const twoColsClass = this.props.twoColsOnTablet
      ? `col1 col2-tablet col1-desktop ${style.twoCols}`
      : ''
    return (
      <div
        className={`${style.widget} ${twoColsClass} ${this.props.className ||
          ''}`}>
        {this.renderTitle()}

        <div className={`${style.contentBox}`}>{this.props.children}</div>
      </div>
    )
  }
}

export default BCorpWidget
