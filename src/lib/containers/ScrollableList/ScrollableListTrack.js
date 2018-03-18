import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import BCorpTouch from '../Touch/BCorpTouch'
import style from './ScrollableList.scss'

/*
  Handles the sizing and animations for the scrollable list inner track
 */
class ScrollableListTrack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: '0',
      height: '0',
      transition: 0
    }

    // dont debounce update of track node when called immediately after mounting
    this.initUpdateTrackNode = this.updateTrackNode.bind(this)
    this.updateTrackNode = debounce(this.updateTrackNode.bind(this), 200)
  }

  /**
   * Get width (or height) of containing track node
   * and bind a function for updating the container track node dimensions to the resize event
   * @return {[void]}
   */
  componentDidMount () {
    this.initUpdateTrackNode()
    window.addEventListener('resize', this.updateTrackNode)

    // we want to keep transition speed at 0ms until just after mounting
    // this stops the scroller from always sliding from the first item to the current item
    setTimeout(() => {
      this.setState({
        transition: this.props.transitionSpeed
      })
    }, 100)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateTrackNode)
  }

  /**
   * This is the best we can do at the moment to respond to changes in the DOM not related to screen resize
   *
   * @see file docs for ContainerMediaQuery
   */
  componentWillReceiveProps () {
    this.updateTrackNode()
  }

  updateTrackNode () {
    if (this.node) {
      this.setState({ width: this.node.clientWidth, height: this.node.clientHeight })
    }
  }

  /**
   * At the end of a touch event,
   * we see how far the user swiped
   * and combine that with touchMoveSensitivity to determine how many items the scroller should move by
   *
   * @param  {[object]} e  Javascript event
   * @param  {[number]} dx distance swiped in pixels
   * @return {[void]}      calls moveList with the determined increment
   */
  touchEnd (e, dx) {
    const { touchMoveSensitivity } = this.props

    const delta = this.props.reverseSwipeScroll ? -dx : dx

    // we calculate an integer number to move by
    // using percentage of element width swiped multiplied by sensitivity
    // higher sensitivity means a smaller swipe moves the scroller further
    const numberToMove = -(delta / this.getElementWidth()) * touchMoveSensitivity
    const intNumberToMove = Math.round(numberToMove)

    return this.props.moveList(e, intNumberToMove)
  }

  getTrackWidth () {
    return (this.state.width / this.props.numberToDisplay) * this.props.elementCount
  }

  getElementWidth () {
    const perc = (100 / this.props.numberToDisplay) / 100
    return (this.state.width * perc)
  }

  getTrackHeightVertical () {
    return (this.state.height / this.props.numberToDisplay) * this.props.elementCount
  }

  getElementHeightVertical () {
    return this.state.height / this.props.numberToDisplay
  }

  getTrackPosition () {
    return -this.getElementWidth() * this.props.currentIndex
  }

  getTrackPositionVertical () {
    return -this.getElementHeightVertical() * this.props.currentIndex
  }

  getCurrentTranslation (dx) {
    // needs to take into account both how far along the track we started
    // and how far we've swiped (if we aren't currently swiping delta will be 0)
    const delta = this.props.reverseSwipeScroll ? -dx : dx
    return this.getTrackPosition() + delta
  }

  getCurrentTranslationVertical (dy) {
    // needs to take into account both how along the track we started
    // and how far we've swiped (if we aren't currently swiping delta will be 0)
    const delta = this.props.reverseSwipeScroll ? -dy : dy
    return this.getTrackPositionVertical() + delta
  }

  getOpacity (dx) {
    // only want to change translation while sliding if we've chosen slide animation
    if (!this.props.animation.includes('fade')) {
      return 1
    }

    const opacity = 1 - Math.abs((dx * this.props.touchMoveSensitivity) / this.getElementWidth())
    return isNaN(opacity) ? 1 : opacity
  }

  getOpacityVertical (dy) {
    // only want to change translation while sliding if we've chosen slide animation
    if (!this.props.animation.includes('fade')) {
      return 1
    }

    const opacity = 1 - Math.abs((dy * this.props.touchMoveSensitivity) / this.getElementHeightVertical())

    return isNaN(opacity) ? 1 : opacity
  }

  getTransform (dx) {
    // only want to change translation while sliding if we've chosen slide animation
    if (!this.props.animation.includes('slide')) {
      return `translate3d(${this.getTrackPosition()}px , 0px, 0px)`
    }

    return `translate3d(${this.getCurrentTranslation(dx)}px , 0px, 0px)`
  }

  getTransformVertical (dy) {
    // only want to change translation while sliding if we've chosen slide animation
    if (!this.props.animation.includes('slide')) {
      return `translate3d(0px, ${this.getTrackPositionVertical()}px, 0px)`
    }

    return `translate3d(0px, ${this.getCurrentTranslationVertical(dy)}px, 0px)`
  }

  getTransition (dx, dy) {
    if (this.props.animation.includes('none')) {
      return 'transform 0s, opacity 0s'
    }

    // only add transition if we're not swiping so there isn't a delay
    if (dx === 0 && dy === 0) {
      const slideTransition = this.props.animation.includes('slide') ? this.state.transition : 0
      const fadeTransition = this.props.animation.includes('fade') ? this.state.transition : 0

      return `transform ${slideTransition}ms, opacity ${fadeTransition}ms`
    }

    return 'transform 0s, opacity 0s'
  }

  /**
   * BCorpTouch holds the state for the touch events
   */
  render () {
    if (this.props.vertical) {
      return this.renderVertical()
    }

    // center items if they don't fill the container
    const alignText = this.state.width > this.getTrackWidth()
      ? '0 auto'
      : undefined

    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={`${style.trackWrapper} track-wrapper`}>

        <BCorpTouch>
          {({ touchStart, touchMove, touchEndCapture, dx, dy }) => {
            return (
              <div
                style={{
                  margin: alignText,
                  width: this.getTrackWidth(),
                  transform: this.getTransform(dx),
                  transition: this.getTransition(dx, dy)
                }}
                className={`${style.track} ${'track'}`}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEndCapture={(e) => {
                  this.touchEnd(e, dx)
                  touchEndCapture(e)
                }} >
                {this.props.children(this.getElementWidth(), this.getOpacity(dx))}
              </div>
            )
          }}
        </BCorpTouch>

      </div>
    )
  }

  renderVertical () {
    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={`${style.trackWrapperVertical} track-wrapper-vertical`}>

        <BCorpTouch>
          {({ touchStart, touchMove, touchEndCapture, dx, dy }) => {
            return (
              <div
                style={{
                  height: this.getTrackHeightVertical(),
                  opacity: this.getOpacityVertical(dy),
                  transform: this.getTransformVertical(dy),
                  transition: this.getTransition(dx, dy)
                }}
                className={`${style.trackVertical} ${'track-vertical'}`}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEndCapture={(e) => {
                  this.touchEnd(e, dy)
                  touchEndCapture(e)
                }} >
                {this.props.children(this.getElementHeightVertical())}
              </div>
            )
          }}
        </BCorpTouch>

      </div>
    )
  }
}

ScrollableListTrack.propTypes = {
  children: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  elementCount: PropTypes.number.isRequired,
  numberToDisplay: PropTypes.number.isRequired,
  transitionSpeed: PropTypes.number,
  touchMoveSensitivity: PropTypes.number,
  vertical: PropTypes.bool,
  reverseSwipeScroll: PropTypes.bool,
  animation: PropTypes.array
}

export default ScrollableListTrack
