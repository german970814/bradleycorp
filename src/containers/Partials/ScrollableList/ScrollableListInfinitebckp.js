import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PositionCircle from './PositionCircle/PositionCircle'
import ScrollableListTrack from './ScrollableListTrack'
import style from './ScrollableList.scss'

class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      children: this.getChildrenWithScrollableListApiAsProps(this.props),
      currentFirstIndex: 0,
      currentFirstPosition: 0,
      currentLastPosition: 0
    }
  }

  /*
    Lifecycle methods
   */

  componentWillReceiveProps (nextProps) {
    // we want to make sure this updates when it receives new children
    if (this.childrenDidUpdate(nextProps.children, this.props.children) ||
    this.numberToDisplayDidUpdate(nextProps.numberToDisplay, this.props.numberToDisplay)) {
      const children = this.getChildrenWithScrollableListApiAsProps(nextProps)
      this.setState({
        children,
        currentFirstIndex: this.getFirstDisplayedChildIndex(children),
        currentFirstPosition: this.getCurrentFirstPosition(children),
        currentLastPosition: this.getCurrentLastPosition(children)
      })
    }
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  /*
    Scrollable List API
   */

  getChildrenWithScrollableListApiAsProps (props) {
    // add the scrollable list api data to the children
    const childrenWithAPI = React.Children.map(props.children, (child, index) => {
      return {
        position: index,
        display: index < props.numberToDisplay,
        originalPosition: index,
        component: child
      }
    })
    const childrenForTrack = [ ...childrenWithAPI ]

    // add the rest of the children to the front of the array in reverse
    childrenWithAPI.reverse().map((child, index) => {
      if (!child.display) {
        childrenForTrack.unshift({
          position: -(index + 1),
          display: false,
          originalPosition: -(index + 1),
          component: child.component
        })
      }
    })

    // returns children array with children to display in the middle
    return childrenForTrack
  }

  moveListByOriginalPosition (e, originalPositionToMoveTo) { // this can only run if we have numberToDisplay set to 1
    if (this.props.numberToDisplay !== 1) {
      return
    }

    const indexOfListItemToCenter = this.state.children.findIndex(child => child.originalPosition === originalPositionToMoveTo)

    // each child holds it's 'distance from 0' as position, so we can just use that as the increment required to move it to 0
    const incrementBy = this.props.reverseScroll
      ? this.state.children[indexOfListItemToCenter].position
      : -this.state.children[indexOfListItemToCenter].position

    return this.moveList(e, incrementBy)
  }

  moveList (e, increment) {
    e.preventDefault()
    if (this.props.stopEventBubblingFromButtons) { // stops it from calling any onClick events on the container eg close lightbox
      e.stopPropagation()
    }

    const reversedIncrement = this.props.reverseScroll ? -increment : increment

    // stop scroller from going off the ends if scroller isn't set to infinite
    const resultingLastDisplayedChildIndex = this.state.currentFirstIndex + this.props.numberToDisplay - reversedIncrement
    const resultingFirstDisplayedChildIndex = this.state.currentFirstIndex - reversedIncrement
    if (!this.props.infinite &&
    (resultingLastDisplayedChildIndex > this.state.children.length ||
     resultingFirstDisplayedChildIndex < 0)) {
      return
    }

    // set new position for each child
    const children = this.state.children.map((child, index, allChildren) => {
      const newPosition = this.getPosition(index, child.position, reversedIncrement)

      return {
        ...child,
        position: newPosition,
        display: (newPosition < this.props.numberToDisplay && newPosition >= 0)
      }
    })

    const childrenSorted = this.sortChildrenByPosition(children)

    // trigger the onPositionChange event passing new children
    if (this.props.onPositionChange) {
      this.props.onPositionChange(childrenSorted)
    }

    return this.setState({
      children: childrenSorted,
      currentFirstIndex: this.getFirstDisplayedChildIndex(childrenSorted),
      currentFirstPosition: this.getCurrentFirstPosition(childrenSorted),
      currentLastPosition: this.getCurrentLastPosition(childrenSorted)
    })
  }

  /*
    Render functions
   */

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
    if (!this.props.showPosition || this.props.numberToDisplay !== 1) {
      return
    }

    const positionZeroIndex = this.state.children.findIndex(child => child.position === 0)
    const childrenPositionAboveZero = this.state.children.slice(positionZeroIndex)
    const positionCirclePosition = childrenPositionAboveZero[0].originalPosition >= 0
      ? childrenPositionAboveZero[0].originalPosition
      : childrenPositionAboveZero.length + childrenPositionAboveZero[0].originalPosition - 1
    console.log(positionCirclePosition)
    console.log(childrenPositionAboveZero)

    return (
      <ul
        className={style.positionCircles}>
        {childrenPositionAboveZero.map((child, index) => {
          return (
            <li
              key={index} >
              <PositionCircle
                onClick={(e) => { this.moveListByOriginalPosition(e, index) }}
                selected={index === positionCirclePosition} />
            </li>
          )
        })}
      </ul>
    )
  }

  renderChildren (width) {
    return this.state.children.map((child, index) => {
      return (
        <li
          key={index}
          style={{ width }}
          className={this.props.listItemClassName} >
          {child.component}
        </li>
      )
    })
  }

  renderScroller () {
    return (
      <div
        className={this.props.wrapperClassName}>

        {this.renderButtonUp()}

        <div
          className={this.props.ulClassName}>
          <ScrollableListTrack
            elementCount={this.state.children.length}
            numberToDisplay={this.props.numberToDisplay || 1}
            currentIndex={this.getFirstDisplayedChildIndex(this.state.children)}>
            {(elementWidth) => this.renderChildren(elementWidth)}
          </ScrollableListTrack>
        </div>

        {this.renderButtonDown()}
        {this.renderButtonsBelow()}
        {this.renderPositionCircles()}

      </div>
    )
  }

  render () {
    return this.renderScroller()
  }

  /*
    Helper functions
   */

  getPosition (index, prevPos, increment) {
    if (increment < 0 && (index < this.props.numberToDisplay) /* moving right */) {
      return this.state.currentLastPosition + index
    }

    if (increment > 0 && (index + 1 < this.state.children.length - this.props.numberToDisplay)) {
      return this.state.currentLastPosition + index
    }

    return prevPos + increment
  }

  getFirstDisplayedChildIndex (children) {
    return children.findIndex(child => {
      return child.display
    })
  }

  getCurrentFirstPosition (children) {
    return children[0].position
  }

  getCurrentLastPosition (children) {
    return children[children.length - 1].position
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
  infinite: PropTypes.bool,
  vertical: PropTypes.bool,
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
