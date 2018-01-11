import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fitLightbox from '../../../../containers/Partials/Lightbox/fitLightbox'
import style from './YoutubePlayerLightbox.scss'

const wrapYoutubeForLightbox = YouTube => {
  class YoutubePlayerLightbox extends Component {
    render () {
      const YoutubeFitLightbox = fitLightbox(YouTube, 0.5625, this.props.maxWidth, this.props.maxWidthTablet)

      if (this.props.lightboxCloseButton) {
        const LightboxCloseButton = this.props.lightboxCloseButton

        return (
          <div
            className={style.videoIframeLightbox}>
            <YoutubeFitLightbox
              className={style.videoIframeLightboxContent}
              {...this.props} />
            <LightboxCloseButton
              onClick={this.props.lightboxCloseButtonOnClick} />
          </div>
        )
      }

      return (
        <div
          className={style.videoIframeLightbox}>
          <YoutubeFitLightbox
            className={style.videoIframeLightboxContent}
            {...this.props} />
        </div>
      )
    }
  }

  YoutubePlayerLightbox.propTypes = {
    maxWidth: PropTypes.number,
    maxWidthTablet: PropTypes.number,
    lightboxCloseButton: PropTypes.func,
    lightboxCloseButtonOnClick: PropTypes.func
  }

  return YoutubePlayerLightbox
}

export default wrapYoutubeForLightbox
