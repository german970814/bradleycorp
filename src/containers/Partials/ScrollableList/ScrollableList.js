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
    }
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  componentWillReceiveProps (nextProps) {
    if (this.childrenDidUpdate(nextProps.children, this.props.children) ||
    this.numberToDisplayDidUpdate(nextProps.numberToDisplay, this.props.numberToDisplay)) {
      const children = this.getChildrenWithScrollableListApiAsProps(nextProps)
      this.setState({
        children,
        currentFirstIndex: this.getFirstDisplayedChildIndex(children),
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

  moveListToIndex (e, newIndex) { // this can only run if we have numberToDisplay set to 1
    if (this.props.numberToDisplay !== 1) {
      return
    }

    // each child holds it's 'distance from 0' as position, so we can just use that as the increment required to move it to 0
    const incrementBy = this.props.reverseScroll
      ? this.state.children[newIndex].position
      : -this.state.children[newIndex].position

    return this.moveList(e, incrementBy)
  }

  moveList (e, increment) {
    e.preventDefault()
    if (this.props.stopEventBubblingFromButtons) { // stops it from calling any onClick events on the container eg close lightbox
      e.stopPropagation()
    }

    if (this.props.reverseScroll) {
      increment = -increment
    }

    // stop scroller from going off the ends if scroller isn't set to infinite
    const resultingLastDisplayedChildIndex = this.state.currentFirstIndex + this.props.numberToDisplay - increment
    const resultingFirstDisplayedChildIndex = this.state.currentFirstIndex - increment
    if (! this.props.infinite
    && (resultingLastDisplayedChildIndex > this.state.children.length
     || resultingFirstDisplayedChildIndex < 0)) {
      return
    }

    // set new position for each child
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

    return this.setState({
      children,
      currentFirstIndex: this.getFirstDisplayedChildIndex(children),
    })
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
    if (!this.props.showPosition || this.props.numberToDisplay !== 1) {
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
                onClick={(e) => { this.moveListToIndex(e, index) }}
                selected={child.display} />
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

  renderScroller (scrollerContent) {
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
    return this.renderScroller(this.renderChildren())
  }

  getPosition (prevPos, increment, arrayLength) {
    const position = (prevPos + increment) % arrayLength
    return position < 0
      ? arrayLength + position
      : position
  }

  getFirstDisplayedChildIndex (children) {
    return children.findIndex(child => {
      return child.display
    })
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
