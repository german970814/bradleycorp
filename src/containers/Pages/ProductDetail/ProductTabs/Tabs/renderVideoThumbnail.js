import React from 'react'
import YouTube from 'react-youtube'
import { youtubeParser } from '../../../../../lib/bcorpUrl'
import addVideoIdFromSrc from '../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import FitLightboxYoutube from '../../../../Partials/Lightbox/FitLightboxYoutube'
import LightboxYoutube from '../../../../Partials/Lightbox/LightboxYoutube'
import tabStyle from './Tabs.scss'

export default function renderVideoThumbnail (videos) {
  const arrayOfSrcs = videos.map(video => {
    return video.meta['video_gallery_video']
  })

  let youtubeOpts = {
    playerVars: {
      showinfo: 0,
      modestbranding: 1,
      controls: 1
    }
  }

  if (arrayOfSrcs.length === 1) {
    const YoutubeWithID = addVideoIdFromSrc(YouTube, arrayOfSrcs[0])

    return (
      <LightboxYoutube>

        <YoutubeWithID
          className={tabStyle.videoIframe}
          opts={youtubeOpts} />

        <FitLightboxYoutube>
          {(width, height) => {

            youtubeOpts = { ...youtubeOpts, width, height }

            return (
              <YoutubeWithID
                opts={youtubeOpts} />
            )
          }}
        </FitLightboxYoutube>

      </LightboxYoutube>
    )
  }

  // if there are mutliple videos we need to pass them as a playlist
  const videoIds = arrayOfSrcs.map(src => {
    return youtubeParser(src)
  })
  const videoIdPlayFirst = videoIds.shift()
  const videoIdsPlayAfter = videoIds.join(',')

  youtubeOpts.playerVars.playlist = videoIdsPlayAfter
  youtubeOpts.playerVars.showinfo = 1
  youtubeOpts.playerVars.controls = 1

  return (
    <LightboxYoutube>

      <YouTube
        videoId={videoIdPlayFirst}
        className={tabStyle.videoIframe}
        opts={youtubeOpts} />

      <FitLightboxYoutube>

      {(width, height) => {

        youtubeOpts = { ...youtubeOpts, width, height }

        return (
          <Youtube
            videoId={videoIdPlayFirst}
            opts={youtubeOpts} />
        )
      }}

      </FitLightboxYoutube>

    </LightboxYoutube>
  )
}
