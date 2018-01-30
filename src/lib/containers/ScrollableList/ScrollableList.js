import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PositionCircle from './PositionCircle/PositionCircle'
import ScrollableListTrack from './ScrollableListTrack'
import style from './ScrollableList.scss'

/**
 * Takes an array of JSX elements and two button elements and arranges them into a swipable scroller
 */
class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      /**
       * Array or children objects,
       * each holding their scroller position, display bool, and component to display
       * @type {[object]}
       */
      children: this.getChildrenWithScrollableListApiAsProps(this.props),
      /**
       * The index of the first child from left to right that's currently being displayed
       * eg if we have 3 children being displayed, it should be the furthest left.
       * @type {[number]}
       */
      currentFirstIndex: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    // check if we need to update the scroller's children
    if (this.childrenDidUpdate(nextProps.children, this.props.children) ||
    this.numberToDisplayDidUpdate(nextProps.numberToDisplay, this.props.numberToDisplay)) {
      const children = this.getChildrenWithScrollableListApiAsProps(nextProps)
      this.setState({
        children,
        currentFirstIndex: this.getFirstDisplayedChildIndex(children)
      })
    }
  }

  /**
   * Takes children from this.props and assigns them to an initial object
   * with position and display meta data
   *
   * The child component is stored in the component object property
   *
   * @param  {[object]} props component props
   * @return {[object]}       child element with meta data
   */
  getChildrenWithScrollableListApiAsProps (props) {
    return React.Children.map(props.children, (child, index) => {
      return {
        position: index,
        display: index < props.numberToDisplay,
        component: child
      }
    })
  }

  /**
   * Move scroller to a given index
   * works by working out the increment required then passes it to moveList
   *
   * Only runs if numberToDisplay === 1
   * @param  {[object]} e        Javascript event
   * @param  {[number]} newIndex Index to move to
   * @return {[void]}            Calls moveList
   */
  moveListToIndex (e, newIndex) {
    if (this.props.numberToDisplay !== 1) {
      return
    }

    let incrementBy = 0

    if (newIndex > this.state.currentFirstIndex) {
      // if we click between the currently selected item and the end
      // then each child holds it's 'distance from 0' as position,
      // so we can just use that as the increment required to move it to 0
      incrementBy = -this.state.children[newIndex].position
    }

    if (newIndex < this.state.currentFirstIndex) {
      incrementBy = this.state.children.length - this.state.children[newIndex].position
    }

    return this.moveList(e, incrementBy)
  }

  /**
   * Move the scroller by a given (positive or negative) increment
   * @param  {[object]} e         Javascript event
   * @param  {[number]} increment Number of items to move by (positive or negative)
   * @return {[void]}             Sets new component state with objects in new position
   */
  moveList (e, increment) {
    if (this.props.stopEventBubblingFromButtons) { // stops it from calling any onClick events on the container eg close lightbox
      e.stopPropagation()
    }

    if (this.props.reverseScroll) {
      increment = -increment
    }

    // stop scroller from going off the ends if scroller isn't set to infinite
    const resultingLastDisplayedChildIndex = this.state.currentFirstIndex + this.props.numberToDisplay - increment
    const resultingFirstDisplayedChildIndex = this.state.currentFirstIndex - increment
    if (resultingLastDisplayedChildIndex > this.state.children.length ||
     resultingFirstDisplayedChildIndex < 0) {
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

    // call the onPositionChange callback passing childrne in new position
    if (this.props.onPositionChange) {
      this.props.onPositionChange(children)
    }

    return this.setState({
      children,
      currentFirstIndex: this.getFirstDisplayedChildIndex(children)
    })
  }

  renderButtonsBelow () {
    if (this.props.positionButtonsBelow) {
      return (
        <div
          className={`${style.buttonsBelow} buttons-below`}>
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
        className={`${style.buttonUp} button-up`}
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
        className={`${style.buttonDown} button-down`}
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
        className={`${style.positionCircles} position-circles`}>
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

  /**
   * Extracts children from state and
   * renders them with given dimensions
   *
   * This function is designed to take dimensions from
   * and be passed as children to ScrollableListTrack
   *
   * @param  {[number]} dimensions height or width, depending on if it's a vertical scroller
   * @return {[array]}            array of JSX elements with their width (or height) set
   */
  renderChildren (dimensions) {
    const inlineStyle = this.props.vertical ? { height: dimensions } : { width: dimensions }
    const className = this.props.vertical
      ? `${style.trackItemVertical} track-item-vertical`
      : `${style.trackItem} track-item`

    return this.state.children.map((child, index) => {
      return (
        <div
          key={index}
          style={inlineStyle}
          className={className}
          data-index={index} >
          {child.component}
        </div>
      )
    })
  }

  renderScroller () {
    return (
      <div
        className={this.props.wrapperClassName}>

        {this.renderButtonUp()}

        <ScrollableListTrack
          moveList={this.moveList.bind(this)}
          elementCount={this.state.children.length}
          numberToDisplay={this.props.numberToDisplay}
          transitionSpeed={this.props.transitionSpeed}
          currentIndex={this.getFirstDisplayedChildIndex(this.state.children)}
          vertical={this.props.vertical}
          touchMoveSensitivity={this.props.touchMoveSensitivity}
          reverseSwipeScroll={this.props.reverseSwipeScroll} >
          {(elementDimension) => this.renderChildren(elementDimension)}
        </ScrollableListTrack>

        {this.renderButtonDown()}
        {this.renderButtonsBelow()}
        {this.renderPositionCircles()}

      </div>
    )
  }

  render () {
    return this.renderScroller()
  }

  /**
   * HELPER FUNCTIONS
   */

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
  /*
    Array of JSX elements to be displayed in the scroller
   */
  children: PropTypes.array.isRequired,
  /*
    JSX element to be displayed as the 'up' button
   */
  buttonUp: PropTypes.element.isRequired,
  /*
    JSX element to be displayed as the 'down' button
   */
  buttonDown: PropTypes.element.isRequired,
  /*
    The number of elements to display at a time in the scroller
   */
  numberToDisplay: PropTypes.number.isRequired,
  /*
    Value of 1 means you have to swipe the distance of the width of 1 element to move the scroller by 1
   */
  touchMoveSensitivity: PropTypes.number,
  /*
    Speed of transition in ms
   */
  transitionSpeed: PropTypes.number,
  /*
    Show position circles under scroller
    (automatically disabled if slider shows more than one element at a time)
   */
  showPosition: PropTypes.bool,
  /*
    Reverse direction of scroll
   */
  reverseScroll: PropTypes.bool,
  /*
    Reverse direction of motion on swipe
   */
  reverseSwipeScroll: PropTypes.bool,
  /*
    Postion buttonUp and buttonDown below the scroller.
    If false they will be displayed to the sides.
   */
  positionButtonsBelow: PropTypes.bool,
  /*
    Prevent events originating from scroller buttons from bubbling
   */
  stopEventBubblingFromButtons: PropTypes.bool,
  /*
    Display the scroller vertically
   */
  vertical: PropTypes.bool,
  /*
    Callback for when the position of the scroller changes
    Will be passed an argument of the next children state (array)
   */
  onPositionChange: PropTypes.func,
  /*
    Custom class name for the top level wrapper div
   */
  wrapperClassName: PropTypes.string
}

ScrollableList.defaultProps = {
  numberToDisplay: 1,
  touchMoveSensitivity: 1,
  transitionSpeed: 600
}

export default ScrollableList
