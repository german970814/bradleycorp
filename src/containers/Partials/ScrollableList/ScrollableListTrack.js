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

    this.state = { width: '0', height: '0' }

    // dont debounce update of track node when called immediately after mounting
    this.initUpdateTrackNode = this.updateTrackNode.bind(this)
    this.updateTrackNode = debounce(this.updateTrackNode.bind(this), 200)
  }

  componentDidMount () {
    this.initUpdateTrackNode()
    window.addEventListener('resize', this.updateTrackNode)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateTrackNode)
  }

  updateTrackNode () {
    if (this.node) {
      this.setState({ width: this.node.clientWidth, height: this.node.clientHeight })
    }
  }

  touchEnd (e, dx) {
    // higher sensitivity means a smaller swipe moves the scroller further
    const sensitivity = this.props.touchMoveSensitivity || 1

    const delta = this.props.reverseSwipeScroll ? -dx : dx

    // we calculate an integer number to move by
    // using percentage of element width swiped multiplied by sensitivity
    const numberToMove = (delta / this.getElementWidth()) * sensitivity
    const intNumberToMove = Math.round(numberToMove)

    return this.props.moveList(e, intNumberToMove)
  }

  getTrackWidth () {
    return (this.state.width / this.props.numberToDisplay) * this.props.elementCount
  }

  getElementWidth () {
    return this.state.width / this.props.numberToDisplay
  }

  getTrackHeightVertical () {
    return (this.state.height / this.props.numberToDisplay) * this.props.elementCount
  }

  getElementHeightVertical () {
    return this.state.height / this.props.numberToDisplay
  }

  getCurrentTranslation (dx) {
    // needs to take into account both how along the track we started
    // and how far we've swiped (if we aren't currently swiping delta will be 0)
    const delta = this.props.reverseSwipeScroll ? -dx : dx
    return -this.getElementWidth() * this.props.currentIndex + delta
  }

  getTransition (dx, dy) {
    // remove css transition if we're swiping so there isn't a delay
    if (dx === 0 && dy === 0) {
      return undefined
    }

    return 'transform 0s'
  }

  render () {
    if (this.props.vertical) {
      return this.renderVertical()
    }

    const alignText = this.state.width > this.getTrackWidth()
      ? '0 auto'
      : undefined

    return (
      <div
        ref={(node) => { this.node = node }}
        className={`${style.trackWrapper} track-wrapper`}>

        <BCorpTouch>
          {({ touchStart, touchMove, touchEndCapture, dx, dy }) => {
            return (
              <div
                style={{
                  margin: alignText,
                  width: this.getTrackWidth(),
                  transform: `translate(${this.getCurrentTranslation(dx)}px , 0px)`,
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
                  transform: `translate(0px, ${this.getCurrentTranslation(dy)}px)`,
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
  touchMoveSensitivity: PropTypes.number,
  vertical: PropTypes.bool,
  reverseSwipeScroll: PropTypes.bool
}

export default ScrollableListTrack
