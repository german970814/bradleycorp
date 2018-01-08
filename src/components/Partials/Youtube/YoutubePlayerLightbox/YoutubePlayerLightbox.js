import React from 'react'
import PropTypes from 'prop-types'
import YoutubeWithOpts from './YoutubeWithOpts'
import fitLightbox from '../../../../containers/Partials/Lightbox/fitLightbox'
import addVideoIdFromSrc from '../addVideoIdFromSrc'
import style from './YoutubePlayerLightbox.scss'

const YoutubePlayerLightbox = props => {
  const YoutubeFitLightbox = fitLightbox(YoutubeWithOpts, 0.5625, props.maxWidth, props.maxWidthTablet)
  const YoutubeVideoID = addVideoIdFromSrc(YoutubeFitLightbox, props.src)

  if (props.lightboxCloseButton) {
    const LightboxCloseButton = props.lightboxCloseButton

    return (
      <div
        className={style.videoIframeLightbox}>
        <YoutubeVideoID
          className={style.videoIframeLightboxContent} />
        <LightboxCloseButton
          onClick={props.lightboxCloseButtonOnClick} />
      </div>
    )
  }

  return (
    <div
      className={style.videoIframeLightbox}>
      <YoutubeVideoID
        className={style.videoIframeLightboxContent} />
    </div>
  )
}

YoutubePlayerLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  maxWidth: PropTypes.number,
  maxWidthTablet: PropTypes.number,
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func
}

export default YoutubePlayerLightbox
