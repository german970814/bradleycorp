import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      children: this.getChildrenWithScrollableListApiAsProps(this.props)
    }

    this.getChildrenWithScrollableListApiAsProps = this.getChildrenWithScrollableListApiAsProps.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
    this.getChildrenToDisplay = this.getChildrenToDisplay.bind(this)
    this.childrenDidUpdate = this.childrenDidUpdate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.childrenDidUpdate(nextProps.children, this.props.children)) {
      this.setState({
        children: this.getChildrenWithScrollableListApiAsProps(nextProps)
      })
    }
  }

  getChildrenWithScrollableListApiAsProps (props) {
    return React.Children.map(props.children, (child, index) => {
      return {
        position: index,
        display: index < props.numberToDisplay,
        component: child
      }
    })
  }

  moveList (e, increment) {
    e.preventDefault()

    const children = this.state.children.map((child, index, allChildren) => {
      const position = this.getPosition(child.position, increment, allChildren.length)

      return {
        ...child,
        position: position,
        display: position < this.props.numberToDisplay
      }
    })

    return this.setState({ ...this.state, children })
  }

  renderChildren () {
    const displayChildren = this.getChildrenToDisplay()
    const displayChildrenSorted = this.sortChildrenByPosition(displayChildren)

    return displayChildrenSorted.map((child, index) => {
      return (
        <li
          key={index}
          className={this.props.listItemClassName} >
          {child.component}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={this.props.wrapperClassName}>
        <button
          onClick={(e) => { this.moveList(e, -1) }}>
          Move Up
        </button>
        <ul
          className={this.props.ulClassName}>
          {this.renderChildren()}
        </ul>
        <button
          onClick={(e) => { this.moveList(e, 1) }}>
          Move Down
        </button>
      </div>
    )
  }

  getPosition (prevPos, increment, arrayLength) {
    const position = (prevPos + increment) % arrayLength
    return position < 0
      ? arrayLength + position
      : position
  }

  getChildrenToDisplay () {
    return this.state.children.filter(child => {
      return child.display
    })
  }

  sortChildrenByPosition (children) {
    return children.sort((child1, child2) => {
      return child1.position - child2.position
    })
  }

  childrenDidUpdate (newChildren, children) {
    if (newChildren.length !== children.length) {
      return true
    }

    children.forEach((child, index) => {
      if (newChildren[index].type !== child.type) {
        return true
      }

      if (newChildren[index].props !== child.props) {
        return true
      }
    })

    return false
  }
}

ScrollableList.propTypes = {
  numberToDisplay: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
  wrapperClassName: PropTypes.string,
  listItemClassName: PropTypes.string,
  ulClassName: PropTypes.string
}

export default ScrollableList
