import React from 'react'
import PropTypes from 'prop-types'
import YoutubeWithOpts from './YoutubeWithOpts'
import fitLightbox from '../../../../containers/Partials/Lightbox/fitLightbox'
import addVideoIdFromSrc from '../addVideoIdFromSrc'
import style from './YoutubePlayerLightbox.scss'

const YoutubePlayerLightbox = props => {
  const YoutubeFitLightbox = fitLightbox(YoutubeWithOpts, 0.5625)
  const YoutubeVideoID = addVideoIdFromSrc(YoutubeFitLightbox, props.src)
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

YoutubePlayerLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func
}

export default YoutubePlayerLightbox
