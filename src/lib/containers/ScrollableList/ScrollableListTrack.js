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
      transition: 'transform 0s'
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
        transition: `transform ${this.props.transitionSpeed}ms`
      })
    }, 100)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateTrackNode)
  }
  
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
    const numberToMove = (delta / this.getElementWidth()) * touchMoveSensitivity
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

  getCurrentTranslation (dx) {
    // needs to take into account both how far along the track we started
    // and how far we've swiped (if we aren't currently swiping delta will be 0)
    const delta = this.props.reverseSwipeScroll ? -dx : dx
    return -this.getElementWidth() * this.props.currentIndex + delta
  }

  getCurrentTranslationVertical (dy) {
    // needs to take into account both how along the track we started
    // and how far we've swiped (if we aren't currently swiping delta will be 0)
    const delta = this.props.reverseSwipeScroll ? -dy : dy
    return -this.getElementHeightVertical() * this.props.currentIndex + delta
  }

  getTransition (dx, dy) {
    // remove css transition if we're swiping so there isn't a delay
    if (dx === 0 && dy === 0) {
      return this.state.transition
    }

    return 'transform 0s'
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
                  transform: `translate3d(${this.getCurrentTranslation(dx)}px , 0px, 0px)`,
                  transition: this.getTransition(dx, dy)
                }}
                className={`${style.track} ${'track'}`}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEndCapture={(e) => {
                  this.touchEnd(e, dx)
                  touchEndCapture(e)
                }} >
                {this.props.children(this.getElementWidth())}
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
        ref={(node) => { this.node = node }}
        className={`${style.trackWrapperVertical} track-wrapper-vertical`}>

        <BCorpTouch>
          {({ touchStart, touchMove, touchEndCapture, dx, dy }) => {
            return (
              <div
                style={{
                  height: this.getTrackHeightVertical(),
                  transform: `translate3d(0px, ${this.getCurrentTranslationVertical(dy)}px, 0px)`,
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
  reverseSwipeScroll: PropTypes.bool
}

export default ScrollableListTrack
