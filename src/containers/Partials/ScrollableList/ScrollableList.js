import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PositionCircle from './PositionCircle/PositionCircle'
import style from './ScrollableList.scss'

class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      children: this.getChildrenWithScrollableListApiAsProps(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.childrenDidUpdate(nextProps.children, this.props.children) ||
    this.numberToDisplayDidUpdate(nextProps.numberToDisplay, this.props.numberToDisplay)) {
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

    if (this.props.stopEventBubblingFromButtons) { // stops it from calling any onClick events on the container eg close lightbox
      e.stopPropagation()
    }

    const children = this.state.children.map((child, index, allChildren) => {
      const newPosition = this.getPosition(child.position, increment, allChildren.length)

      return {
        ...child,
        position: newPosition,
        display: newPosition < this.props.numberToDisplay
      }
    })

    if (this.props.onPositionChange) {
      this.props.onPositionChange(children)
    }

    return this.setState({ ...this.state, children })
  }

  renderButtonsBelow () {
    if (this.props.positionButtonsBelow) {
      return (
        <div
          className={[style.buttonsBelow, this.props.buttonsBelowClassName].join(' ')}>
          {this.buttonUp()}
          <img
            className={style.buttonsBelowSeparator}
            src={require('../../../images/prev-next-separator/prev-next-separator@2x.png')} />
          {this.buttonDown()}
        </div>
      )
    }
  }

  renderButtonUp () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonUp()
    }
  }

  buttonUp () {
    return (
      <div
        className={[style.buttonUp, this.props.buttonUpContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, 1) } } >
        {this.props.buttonUp}
      </div>
    )
  }

  renderButtonDown () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonDown()
    }
  }

  buttonDown () {
    return (
      <div
        className={[style.buttonDown, this.props.buttonDownContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, -1) } } >
        {this.props.buttonDown}
      </div>
    )
  }

  renderPositionCircles () {
    if (!this.props.showPosition) {
      return
    }

    return (
      <ul
        className={style.positionCircles}>
        {this.state.children.map((child, index) => {
          return (
            <li
              key={index} >
              <PositionCircle
                selected={child.display} />
            </li>
          )
        })}
      </ul>
    )
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

  renderScroller (scrollerContent) {
    return (
      <div
        className={this.props.wrapperClassName}>

        {this.renderButtonUp()}

        <ul
          className={this.props.ulClassName}>
          {scrollerContent}
        </ul>

        {this.renderButtonDown()}
        {this.renderButtonsBelow()}
        {this.renderPositionCircles()}

      </div>
    )
  }

  render () {
    return this.renderScroller(this.renderChildren())
  }

  getPosition (prevPos, increment, arrayLength) {
    // we want items to cycle the other way if vertical
    if (this.props.reverseScroll) {
      increment = -increment
    }

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

  numberToDisplayDidUpdate (newNumber, oldNumber) {
    return newNumber !== oldNumber
  }
}

ScrollableList.propTypes = {
  numberToDisplay: PropTypes.number.isRequired,
  showPosition: PropTypes.bool,
  reverseScroll: PropTypes.bool,
  positionButtonsBelow: PropTypes.bool,
  stopEventBubblingFromButtons: PropTypes.bool,
  children: PropTypes.array.isRequired,
  onPositionChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  listItemClassName: PropTypes.string,
  ulClassName: PropTypes.string,
  buttonUpContainerClassName: PropTypes.string,
  buttonDownContainerClassName: PropTypes.string,
  buttonsBelowClassName: PropTypes.string,
  buttonUp: PropTypes.element.isRequired,
  buttonDown: PropTypes.element.isRequired
}

export default ScrollableList
