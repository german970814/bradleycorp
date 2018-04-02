import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { lookupColor } from '../../../../lib/bcorpStyles'
import BCorpVideo from '../BCorpVideo'
import style from './VideoBackground.scss'

/**
 * Adds a video background to a relatively positioned contaner node.
 * There is the option to add a placeholder image that will fade out when the video is ready to play.
 *
 * Video backgrounds will autoplay and be muted.
 *
 * Note: although Vimeo is technically supported, YouTube is recommended.
 * Vimeo currently has no way to mute the video, and the autoplay argument also seems to have a bug.
 *
 * Make sure video has a 0.5625 aspect ratio (standard for YouTube)
 *
 */
class VideoBackground extends Component {
  constructor (props) {
    super(props)

    this.state = { width: 0, height: 0, top: 0, left: 0, playerReady: false }

    this.initUpdateBackgroundDimensions = this.updateBackgroundDimensions.bind(
      this
    )
    this.updateBackgroundDimensions = debounce(
      this.updateBackgroundDimensions.bind(this),
      200
    )
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

  /**
   * Height and width are set such that,
   * while keeping its' aspect ratio
   * (important since youtube videos always keep aspect ratio of video regardless size of iframe),
   * the video always covers its' container.
   *
   * @return {[void]}
   */
  updateBackgroundDimensions () {
    if (!this.props.node) {
      return
    }

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

    return this.setState({ width, height, top, left })
  }

  /**
   * Autoplay currently doesnt work for youtube, so we need to do it here.
   * We can also mute the player.
   *
   * @param  {[object]} event
   * @return {[void]}
   */
  onPlayerReady (event) {
    event.target.mute()
    event.target.playVideo()
  }

  onPlay (event) {
    this.setState({ playerReady: true })
  }

  /**
   * Renders the image that appears by default until the video starts playing
   */
  renderPlaceholderImage () {
    return (
      <div
        style={{
          backgroundImage: this.props.placeholder
            ? `url(${this.props.placeholder})`
            : undefined,
          backgroundColor: lookupColor('black'),
          opacity: this.state.playerReady ? 0 : 1
        }}
        className={style.placeholderImage}
      />
    )
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
        className={style.videoBackground}>
        {this.renderPlaceholderImage()}

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
            onPlay: this.onPlay.bind(this),
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
            }
          }}
        />
      </div>
    )
  }
}

VideoBackground.propTypes = {
  /**
   * node ref for the container that we want to give a video background to.
   * Note: this container should have relative positioning
   */
  node: PropTypes.object.isRequired,
  /**
   * A Video URL or just the ID (YouTube)
   */
  url: PropTypes.string.isRequired,
  /**
   * Placeholder Image Src, this will show while the video is loading and fade out when the video is ready.
   * Leave empty for no placeholder
   */
  placeholder: PropTypes.string
}

export default VideoBackground
