import React from 'react'
import { youtubeParser } from '../../../../../../lib/bcorpUrl'
import { clean } from '../../../../../../lib/bcorpArray'
import LIGHTBOXSIZES from '../../../../../../lib/containers/Lightbox/lightboxVars'
import LightboxYoutube from '../../../../../../lib/containers/Lightbox/LightboxYoutube'
import BCorpVideo from '../../../../../../lib/components/BCorpVideo/BCorpVideo'
import FixedAspectRatioBox from '../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import tabStyle from './Tabs.scss'

function onYoutubeLightboxReady (event) {
  event.target.playVideo()
}

export default function renderVideoThumbnail (videos) {
  const arrayOfSrcs = videos.map(video => {
    return video.meta['video_gallery_video']
  })

  const youtubeProps = {
    opts: {
      width: '100%', /* width and height 100% to fit aspect ratio wrapper */
      height: '100%',
      playerVars: {
        showinfo: 0,
        modestbranding: 1,
        controls: 1
      }
    }
  }

  const youtubePropsLightbox = {...youtubeProps}
  youtubePropsLightbox.opts.playerVars.autoplay = 1
  youtubePropsLightbox.onReady = onYoutubeLightboxReady

  const vimeoProps = {
    playerOptions: {
      byline: false,
      loop: true,
      portrait: false,
      title: false
    }
  }

  const vimeoPropsLightbox = {...vimeoProps}
  vimeoPropsLightbox.autoplay = true

  const playerForSingleVideo = url => {
    return (
      <LightboxYoutube>

        <BCorpVideo
          url={url}
          className={tabStyle.videoIframe}
          youtubeProps={youtubeProps}
          vimeoProps={vimeoProps} />

        <FixedAspectRatioBox
          maxHeight={LIGHTBOXSIZES.heightMinusCloseButton} >
          <BCorpVideo
            url={url}
            youtubeProps={youtubePropsLightbox}
            vimeoProps={vimeoPropsLightbox} />
        </FixedAspectRatioBox>

      </LightboxYoutube>
    )
  }

  if (arrayOfSrcs.length === 1) {
    // if we only have one video src, no need to make a playlist
    return playerForSingleVideo(arrayOfSrcs[0])
  }

  // if there are mutliple videos we need to pass them as a playlist
  //
  // currently only the youtube API supports playlists
  // so first we check all srcs to see if they are youtube
  //
  // once we've removed any vimeo or invalid srcs from the list
  // we will have an array of valid youtube IDs.
  //
  // If all the IDs were Vimeo, then this will be empty,
  // and we render a single Vimeo player using the first src in the array we had before processing
  //
  // If only one ID remains,
  // we can just render a single youtube player without the extra playlist options
  //
  // Otherwise we render a youtube playlist with the multiple IDs we have
  //
  let videoIds = arrayOfSrcs.map(src => {
    return youtubeParser(src)
  })
  videoIds = clean(videoIds, false)

  if (videoIds.length === 0) {
    return playerForSingleVideo(arrayOfSrcs[0])
  }

  if (videoIds.length === 1) {
    return playerForSingleVideo(videoIds[0])
  }

  const videoIdPlayFirst = videoIds.shift()
  const videoIdsPlayAfter = videoIds.join(',')

  youtubeProps.opts.playerVars.playlist = videoIdsPlayAfter
  youtubePropsLightbox.opts.playerVars.playlist = videoIdsPlayAfter

  youtubeProps.opts.playerVars.showinfo = 1
  youtubePropsLightbox.opts.playerVars.showinfo = 1

  youtubeProps.opts.playerVars.controls = 1
  youtubePropsLightbox.opts.playerVars.controls = 1

  return (
    <LightboxYoutube>

      <BCorpVideo
        url={videoIdPlayFirst}
        className={tabStyle.videoIframe}
        youtubeProps={youtubeProps}
        noVimeo />

      <FixedAspectRatioBox
        maxHeight={LIGHTBOXSIZES.heightMinusCloseButton} >
        <BCorpVideo
          url={videoIdPlayFirst}
          youtubeProps={youtubePropsLightbox}
          noVimeo />
      </FixedAspectRatioBox>

    </LightboxYoutube>
  )
}
