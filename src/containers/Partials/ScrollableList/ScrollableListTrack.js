import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
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

  getTrackWidth () {
    return (this.state.width / this.props.numberToDisplay) * this.props.elementCount
  }

  getElementWidth () {
    return this.state.width / this.props.numberToDisplay
  }

  getCurrentTranslation () {
    return (this.props.currentIndex * -this.state.width) / this.props.numberToDisplay
  }

  render () {
    return (
      <div
        ref={(node) => { this.node = node }}
        className={`${style.trackWrapper} track-wrapper`}>
        <div
          style={{
            width: this.getTrackWidth(),
            transform: `translate(${this.getCurrentTranslation()}px , 0px)`
          }}
          className={`${style.track} ${'track'}`}>
          {this.props.children(this.getElementWidth())}
        </div>
      </div>
    )
  }
}

ScrollableListTrack.propTypes = {
  children: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  elementCount: PropTypes.number.isRequired,
  numberToDisplay: PropTypes.number.isRequired
}

export default ScrollableListTrack
