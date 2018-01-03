import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../YoutubeVideoID'
import style from './YoutubePlayerLightbox.scss'

const YoutubePlayerLightbox = props => {

  let height = props.lightboxSize.height
  let width = height*1.78 // youtube aspect ratio

  if (width > props.lightboxSize.width) {
    width = props.lightboxSize.width
    height = width*0.5625 // youtube aspect ratio
  }

  let margin = (props.lightboxSize.height - height)/2
  console.log(height)
  console.log(props.lightboxSize.height)
  console.log(margin)

  const youtubeOpts = {
    height: `${height}`,
    width: `${width}`,
    playerVars: {
      showinfo: 0,
      modestbranding: 1,
      controls: 0
    }
  }

  const containerStyle = {
    marginTop: `${margin}px`,
    marginBottom: `${margin}px`
  }

  const YoutubeVideoID = addVideoIdFromSrc(YouTube, props.src)
  const LightboxCloseButton = props.lightboxCloseButton

  return (
    <div
      style={containerStyle}
      className={style.videoIframeLightbox}>
      <YoutubeVideoID
        className={style.videoIframeLightboxContent}
        opts={youtubeOpts} />
      <LightboxCloseButton
        onClick={props.lightboxCloseButtonOnClick} />
    </div>
  )
}

YoutubePlayerLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  lightboxSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func
}

export default YoutubePlayerLightbox
