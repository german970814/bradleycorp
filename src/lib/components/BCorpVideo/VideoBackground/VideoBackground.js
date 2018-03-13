import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import BCorpVideo from '../BCorpVideo'
import style from './VideoBackground.scss'

class VideoBackground extends Component {
  constructor (props) {
    super(props)

    this.state = { width: 0, height: 0, top: 0, left: 0 }

    this.initUpdateBackgroundDimensions = this.updateBackgroundDimensions.bind(this)
    this.updateBackgroundDimensions = debounce(this.updateBackgroundDimensions.bind(this), 200)
  }

  componentDidMount () {
    this.initUpdateBackgroundDimensions()
    window.addEventListener('resize', this.updateBackgroundDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBackgroundDimensions)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.node !== this.props.node) {
      this.initUpdateContainerDimensions()
    }
  }

  updateBackgroundDimensions () {
    const { offsetWidth, offsetHeight } = this.props.node

    let height = offsetWidth * 0.5625
    let width = offsetWidth
    let top = (offsetHeight - height) / 2
    let left = 0

    if (height < offsetHeight) {
      height = offsetHeight
      width = offsetHeight * (1 / 0.5625)
      top = 0
      left = (offsetWidth - width) / 2
    }

    this.setState({ width, height, top, left })
  }

  onPlayerReady (event) {
    event.target.mute()
    event.target.playVideo()
  }

  vimeoOnReady (object) {
    console.log(object)
  }

  render () {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height,
          top: this.state.top,
          left: this.state.left
        }}
        className={style.videoBackground} >
        <BCorpVideo
          url={this.props.url}
          youtubeProps={{
            opts: {
              playerVars: {
                autoplay: 1,
                controls: 0,
                fs: 0,
                loop: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
              }
            },
            onReady: this.onPlayerReady,
            onPause: this.onPlayerReady,
            onEnd: this.onPlayerReady
          }}
          vimeoProps={{
            autoplay: true,
            playerOptions: {
              autoplay: true,
              byline: false,
              loop: true,
              portrait: false,
              title: false,
              width: this.state.width,
              height: this.state.height
            },
            onReady: this.vimeoOnReady
          }} />
      </div>
    )
  }
}

VideoBackground.propTypes = {
  /**
   * node ref for the container that we want to give a video background to
   * Note: this container should have relative positioning
   */
  node: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
}

export default VideoBackground
