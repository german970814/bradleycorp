import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PositionCircle from './PositionCircle/PositionCircle'
import ScrollableListTrack from './ScrollableListTrack'
import style from './ScrollableList.scss'

/**
 * Takes an array of JSX elements and two button elements and arranges them into a swipeable scroller
 */
class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      /**
       * The index of the first child from left to right that's currently being displayed
       * eg if we have 3 children being displayed, it should be the furthest left.
       * @type {[number]}
       */
      currentFirstIndex: 0
    }

    this.slideShowDirectionForward = true
  }

  componentDidMount () {
    if (this.props.slideShow) {
      this.resetSlideTimer()
    }
  }

  componentWillUnmount () {
    if (this.slideTimer) {
      clearTimeout(this.slideTimer)
    }
  }

  componentWillReceiveProps (nextProps) {
    // check if we need to update the scroller's children
    if (
      this.childrenDidUpdate(nextProps.children, this.props.children) ||
      this.numberToDisplayDidUpdate(
        nextProps.numberToDisplay,
        this.props.numberToDisplay
      ) ||
      this.props.alwaysUpdate
    ) {
      this.setState({ currentFirstIndex: 0 })
    }
  }

  resetSlideTimer () {
    if (this.slideTimer) {
      clearTimeout(this.slideTimer)
    }
    this.slideTimer = setTimeout(
      this.slide.bind(this),
      this.props.slideShowSpeed
    )
  }

  slide () {
    // reverse direction if we hit an end
    if (this.childIsDisplayed(this.props.children.length - 1)) {
      this.slideShowDirectionForward = false
    } else if (this.childIsDisplayed(0)) {
      this.slideShowDirectionForward = true
    }

    if (this.slideShowDirectionForward) {
      this.moveList(null, 1)
    } else {
      this.moveList(null, -1)
    }
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

    let incrementBy = newIndex - this.state.currentFirstIndex

    // reverseScroll breaks clicking on position circles
    // since an increment of 1 from the start will seem to go off the end (becomes increment of -1)
    // we need to make sure we undo this before we pass it to moveList
    if (this.props.reverseScroll) {
      incrementBy = -incrementBy
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
    if (e && this.props.stopEventBubblingFromButtons) {
      // stops it from calling any onClick events on the container eg close lightbox
      e.stopPropagation()
    }

    if (this.props.children.length <= this.props.numberToDisplay) {
      return
    }

    if (this.props.reverseScroll) {
      increment = -increment
    }

    let newIndex = this.state.currentFirstIndex + increment

    // stop scroller from going off the ends if scroller isn't set to infinite
    const resultingLastDisplayedChildIndex =
      this.state.currentFirstIndex + this.props.numberToDisplay + increment
    const resultingFirstDisplayedChildIndex =
      this.state.currentFirstIndex + increment
    if (resultingLastDisplayedChildIndex > this.props.children.length) {
      newIndex = this.props.children.length - this.props.numberToDisplay
    } else if (resultingFirstDisplayedChildIndex < 0) {
      newIndex = 0
    }

    // call the onPositionChange callback passing childrne in new position
    if (this.props.onPositionChange) {
      this.props.onPositionChange(this.props.children, newIndex)
    }

    this.setState({ currentFirstIndex: newIndex })

    if (this.props.slideShow) {
      this.resetSlideTimer()
    }
  }

  renderButtonsBelow () {
    if (this.props.positionButtonsBelow) {
      return (
        <div className={`${style.buttonsBelow} buttons-below`}>
          {this.buttonUp()}
          <img
            className={style.buttonsBelowSeparator}
            src={require('../../../images/prev-next-separator/prev-next-separator@2x.png')}
          />
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
        onClick={e => {
          this.moveList(e, -1)
        }}>
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
        onClick={e => {
          this.moveList(e, 1)
        }}>
        {this.props.buttonDown}
      </div>
    )
  }

  renderPositionCircles () {
    if (!this.props.showPosition || this.props.numberToDisplay !== 1) {
      return
    }

    const positionCirclesVertical = this.props.positionCirclesVertical
      ? `${style.vertical} position-circles-vertical`
      : ''

    return (
      <ul
        className={`${
          style.positionCircles
        } position-circles ${positionCirclesVertical}`}>
        {this.props.children.map((child, index) => {
          return (
            <li key={index}>
              <PositionCircle
                onClick={e => {
                  this.moveListToIndex(e, index)
                }}
                selected={this.childIsDisplayed(index)}
              />
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
  renderChildren (dimensions, opacity) {
    const className = this.props.vertical
      ? `${style.trackItemVertical} track-item-vertical`
      : `${style.trackItem} track-item`
    return this.props.children.map((child, index) => {
      const inlineStyle = this.props.vertical
        ? { height: dimensions }
        : { width: dimensions }

      if (this.props.animation.includes('fade')) {
        inlineStyle.transition = `opacity ${this.props.transitionSpeed}ms`

        if (!isNaN(opacity)) {
          inlineStyle.opacity = this.childIsDisplayed(index)
            ? opacity
            : 1 - opacity
        }
      }

      return (
        <div
          key={index}
          style={inlineStyle}
          className={className}
          data-index={index}>
          {child}
        </div>
      )
    })
  }

  renderScroller () {
    return (
      <div className={this.props.wrapperClassName}>
        {(this.props.numberToDisplay < this.props.numberOfPosts) &&
          this.renderButtonUp()}

        <ScrollableListTrack
          moveList={this.moveList.bind(this)}
          elementCount={this.props.children.length}
          numberToDisplay={this.props.numberToDisplay}
          transitionSpeed={this.props.transitionSpeed}
          currentIndex={this.state.currentFirstIndex}
          vertical={this.props.vertical}
          touchMoveSensitivity={this.props.touchMoveSensitivity}
          reverseSwipeScroll={this.props.reverseSwipeScroll}
          animation={this.props.animation}>
          {(elementDimension, opacity) =>
            this.renderChildren(elementDimension, opacity)
          }
        </ScrollableListTrack>
        {(this.props.numberToDisplay < this.props.numberOfPosts) &&
          this.renderSliderNavigation()}
      </div>
    )
  }

  renderSliderNavigation () {
    return (<React.Fragment>
      {this.renderButtonDown()}
      {this.renderButtonsBelow()}
      {this.renderPositionCircles()}
    </React.Fragment>)
  }

  render () {
    return this.renderScroller()
  }

  /**
   * HELPER FUNCTIONS
   */

  childIsDisplayed (index) {
    return (
      index >= this.state.currentFirstIndex &&
      index <= this.state.currentFirstIndex + this.props.numberToDisplay - 1
    )
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
  buttonUp: PropTypes.element,
  /*
    JSX element to be displayed as the 'down' button
   */
  buttonDown: PropTypes.element,
  /*
    The number of elements to display at a time in the scroller
   */
  numberToDisplay: PropTypes.number,

  numberOfPosts: PropTypes.number,
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
    Display position circles vertically
  */
  positionCirclesVertical: PropTypes.bool,
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
    Update the children whenever the component receives new props, regardless of if they changed
   */
  alwaysUpdate: PropTypes.bool,
  /*
    Choose animation for the slider
   */
  animation: PropTypes.arrayOf(PropTypes.oneOf(['none', 'slide', 'fade'])),
  /*
    Have the slider play automatically on a timer
   */
  slideShow: PropTypes.bool,
  /*
    Time between each transition in ms
   */
  slideShowSpeed: PropTypes.number,
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
  transitionSpeed: 600,
  animation: ['slide'],
  slideShowSpeed: 5000
}

export default ScrollableList
