import React from 'react'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../../../../../components/Partials/YoutubeThumbnail/YoutubeThumbnail'
import LightboxYoutube from '../../../../Partials/Lightbox/LightboxYoutube'

export default function renderVideoThumbnail(src, className) {
  const youtubeOpts = {
    playerVars: {
      showinfo: 0,
      modestbranding: 1
    }
  }
  const YoutubeThumbnail = addVideoIdFromSrc(YouTube, src)

  return (
    <LightboxYoutube>
      <YoutubeThumbnail
        className={className}
        opts={youtubeOpts} />
    </LightboxYoutube>
  )
}
