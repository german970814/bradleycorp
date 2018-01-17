import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import BCorpTouch from '../../../../../../Partials/Touch/BCorpTouch'
import addVideoIdFromSrc from '../../../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import FitLightboxYoutube from '../../../../../../Partials/Lightbox/FitLightboxYoutube'
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
        onTouchEnd={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItem} />
    )
  }

  renderVideo () {
    const YoutubeWithID = addVideoIdFromSrc(YouTube, this.props.src)
    const videoStyle = {
      backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@2x.png')})`
    }
    return (
      <Lightbox>

        <div
          style={videoStyle}
          className={style.listItemVideo} />

        <FitLightboxYoutube>
          {(width, height) => {
            return (
              <YoutubeWithID
                opts={{width, height}}/>
            )
          }}
        </FitLightboxYoutube>

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
