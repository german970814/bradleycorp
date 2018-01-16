import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import BCorpTouch from '../Touch/BCorpTouch'
import style from './ScrollableList.scss'

class ScrollableListTrack extends Component {
  constructor (props) {
    super(props)

    this.state = { width: '0', height: '0' }

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

  touchEnd (e, dx, dy) {
    const sensitivity = this.props.touchMoveSensitivity || 1

    const deltaX = this.props.reverseSwipeScroll ? -dx : dx
    const numberToMove = (deltaX / this.getElementWidth()) * sensitivity
    const intNumberToMove = numberToMove < 0
      ? Math.ceil(numberToMove)
      : Math.floor(numberToMove)

    return this.props.moveList(e, intNumberToMove)
  }

  touchEndVertical (e, dx, dy) {
    const sensitivity = this.props.touchMoveSensitivity || 1

    const deltaY = this.props.reverseSwipeScroll ? -dy : dy
    const numberToMove = (deltaY / this.getElementWidth()) * sensitivity
    const intNumberToMove = numberToMove < 0
      ? Math.ceil(numberToMove)
      : Math.floor(numberToMove)

    console.log(intNumberToMove)
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

  getCurrentTranslation (dx, dy) {
    const deltaX = this.props.reverseSwipeScroll ? -dx : dx
    return -this.getElementWidth() * this.props.currentIndex + deltaX
  }

  getCurrentTranslationVertical (dx, dy) {
    const deltaY = this.props.reverseSwipeScroll ? -dy : dy
    return -this.getElementHeightVertical() * this.props.currentIndex + deltaY
  }

  getTransition (dx, dy) {
    if (dx === 0 && dy === 0) {
      return undefined
    }

    return 'transform 0s'
  }

  render () {
    if (this.props.vertical) {
      return this.renderVertical()
    }

    return (
      <div
        ref={(node) => { this.node = node }}
        className={`${style.trackWrapper} track-wrapper`}>

        <BCorpTouch>
          {(touchStart, touchMove, touchEnd, dx, dy) => {
            return (
              <div
                style={{
                  width: this.getTrackWidth(),
                  transform: `translate(${this.getCurrentTranslation(dx, dy)}px , 0px)`,
                  transition: this.getTransition(dx, dy)
                }}
                className={`${style.track} ${'track'}`}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={(e) => {
                  this.touchEnd(e, dx, dy)
                  touchEnd()
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
          {(touchStart, touchMove, touchEnd, dx, dy) => {
            return (
              <div
                style={{
                  height: this.getTrackHeightVertical(),
                  transform: `translate(0px, ${this.getCurrentTranslationVertical(dx, dy)}px)`,
                  transition: this.getTransition(dx, dy)
                }}
                className={`${style.trackVertical} ${'track-vertical'}`}
                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={(e) => {
                  this.touchEndVertical(e, dx, dy)
                  touchEnd()
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
