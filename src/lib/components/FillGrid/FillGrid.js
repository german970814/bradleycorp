// @flow
import * as React from 'react'
import { sortIntoRows } from '../../bcorpJSX'

type Props = {
  children: React.ChildrenArray<React.Element<any>>,
  colClasses: Array<string>,
  // number of pixels to make the gutter between columns
  gutter?: number
}

/**
 * Given a number of child elements,
 * this component renders them into a grid with columns of user defined width.
 *
 * We loop through the given element applying a column class from the array,
 * when we reach the end of the col class array we start a new row
 */
class FillGrid extends React.Component<Props> {
  renderColumns () {
    const { colClasses } = this.props

    return React.Children.map(this.props.children, (child, index) => {
      // makes sure we loop through the colClasses if length of children if bigger
      const colClass = colClasses[index % colClasses.length]

      const padding = this.props.gutter ? `${this.props.gutter / 2}px` : 0

      return (
        <div
          style={{
            paddingLeft: padding,
            paddingRight: padding
          }}
          key={index}
          className={colClass}>
          {child}
        </div>
      )
    })
  }

  render () {
    // offset the whole row by half the gutter size so we're still flush with the edges
    const margin = this.props.gutter ? `${-this.props.gutter / 2}px` : 0

    return (
      <div
        style={{
          marginLeft: margin,
          marginRight: margin
        }}>
        {sortIntoRows(this.renderColumns(), this.props.colClasses.length)}
      </div>
    )
  }
}

/**
 * Helper function for creating a grid when cols are all the same size
 *
 * @param  {string} colClass
 * @param  {number} rowLength
 * @return {[type]}             [description]
 */
export function getColumnClassesForGrid (colClass: string, rowLength: number) {
  const colClasses = []

  for (let i = 0; i < rowLength; i++) {
    colClasses.push(colClass)
  }

  return colClasses
}

export default FillGrid
