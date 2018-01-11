import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addVideoIdFromSrc from '../../../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import wrapYoutubeForLightbox from '../../../../../../../components/Partials/Youtube/YoutubePlayerLightbox/wrapYoutubeForLightbox'
import Lightbox from '../../../../../../Partials/Lightbox/Lightbox'
import style from './VerticalListItem.scss'

class VerticalListItem extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }
    return (
      <div
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItem} />
    )
  }

  renderVideo () {
    const YoutubePlayerLightbox = wrapYoutubeForLightbox(addVideoIdFromSrc(YouTube, this.props.src))
    const videoStyle = {
      backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@2x.png')})`
    }
    return (
      <Lightbox>

        <div
          style={videoStyle}
          className={style.listItemVideo} />

        <YoutubePlayerLightbox />

      </Lightbox>
    )
  }

  render () {
    if (this.props.video) {
      return this.renderVideo()
    }
    return this.renderImage()
  }
}

VerticalListItem.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  video: PropTypes.bool
}

export default VerticalListItem
