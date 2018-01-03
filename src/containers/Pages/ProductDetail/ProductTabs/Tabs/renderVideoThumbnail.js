import React from 'react'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../../../../../components/Partials/YoutubeThumbnail/YoutubeThumbnail'
import LightboxYoutube from '../../../../Partials/Lightbox/LightboxYoutube'
import tabStyle from './Tabs.scss'

export default function renderVideoThumbnail (src) {
  const youtubeOpts = {
    playerVars: {
      showinfo: 0,
      modestbranding: 1
    }
  }
  const YoutubeThumbnail = addVideoIdFromSrc(YouTube, src)

  return (
    <LightboxYoutube
      lightboxClass={tabStyle.videoIframeLightbox}>
      <YoutubeThumbnail
        className={tabStyle.videoIframe}
        opts={youtubeOpts} />
      <YoutubeThumbnail
        className={tabStyle.videoIframeLightboxContent}
        opts={youtubeOpts} />
    </LightboxYoutube>
  )
}
