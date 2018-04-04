// @flow
import * as React from 'react'

type Props = {
  children: React.ChildrenArray<React.Element<any>>,
  colClasses: Array<string>
}

/**
 * Given a number of child elements,
 * this component renders them into columns of user defined width.
 */
class FillColumns extends React.Component<Props> {
  renderColumns () {
    return this.props.colClasses.map((colClass, index) => {
      const children = React.Children.toArray(this.props.children)
      return (
        <div key={index} className={colClass}>
          {children.map((child, childIndex) => {
            return childIndex % this.props.colClasses.length === index
              ? children[childIndex]
              : null
          })}
        </div>
      )
    })
  }

  render () {
    return <div className={'row'}>{this.renderColumns()}</div>
  }
}

export default FillColumns
