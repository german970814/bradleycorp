import React from 'react'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import wrapYoutubeForLightbox from '../../../../../components/Partials/Youtube/YoutubePlayerLightbox/wrapYoutubeForLightbox'
import LightboxYoutube from '../../../../Partials/Lightbox/LightboxYoutube'
import tabStyle from './Tabs.scss'

export default function renderVideoThumbnail (src) {
  const youtubeOpts = {
    playerVars: {
      showinfo: 0,
      modestbranding: 1,
      controls: 0
    }
  }
  const YoutubeThumbnail = addVideoIdFromSrc(YouTube, src)
  const YoutubePlayerLightbox = wrapYoutubeForLightbox(addVideoIdFromSrc(YouTube, src))

  return (
    <LightboxYoutube>
      <YoutubeThumbnail
        className={tabStyle.videoIframe}
        opts={youtubeOpts} />
      <YoutubePlayerLightbox />
    </LightboxYoutube>
  )
}
