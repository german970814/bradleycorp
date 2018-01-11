import React from 'react'
import YouTube from 'react-youtube'
import { youtubeParser } from '../../../../../lib/bcorpUrl'
import addVideoIdFromSrc from '../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import wrapYoutubeForLightbox from '../../../../../components/Partials/Youtube/YoutubePlayerLightbox/wrapYoutubeForLightbox'
import LightboxYoutube from '../../../../Partials/Lightbox/LightboxYoutube'
import tabStyle from './Tabs.scss'

export default function renderVideoThumbnail (videos) {

  const arrayOfSrcs = videos.map(video => {
    return video.meta['video_gallery_video']
  })

  const youtubeOpts = {
    playerVars: {
      showinfo: 0,
      modestbranding: 1,
      controls: 1
    }
  }

  if (arrayOfSrcs.length === 1) {
    const YoutubeThumbnail = addVideoIdFromSrc(YouTube, arrayOfSrcs[0])
    const YoutubePlayerLightbox = wrapYoutubeForLightbox(YoutubeThumbnail)

    console.log(youtubeOpts)
    return (
      <LightboxYoutube>

        <YoutubeThumbnail
          className={tabStyle.videoIframe}
          opts={youtubeOpts} />

        <YoutubePlayerLightbox
          opts={youtubeOpts} />

      </LightboxYoutube>
    )
  }

  let videoIds = arrayOfSrcs.map(src => {
    return youtubeParser(src)
  })
  const videoIdPlayFirst = videoIds.shift()
  const videoIdsPlayAfter = videoIds.join(',')

  youtubeOpts.playerVars.playlist = videoIdsPlayAfter
  youtubeOpts.playerVars.showinfo = 1
  youtubeOpts.playerVars.controls = 1

  const YoutubePlayerLightbox = wrapYoutubeForLightbox(YouTube)

  console.log(youtubeOpts)
  return (
    <LightboxYoutube>

      <YouTube
        videoId={videoIdPlayFirst}
        className={tabStyle.videoIframe}
        opts={youtubeOpts} />

      <YoutubePlayerLightbox
        videoId={videoIdPlayFirst}
        opts={youtubeOpts} />

    </LightboxYoutube>
  )
}
