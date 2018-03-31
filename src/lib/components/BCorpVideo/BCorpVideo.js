import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import Vimeo from 'react-vimeo'
import { stringIsNumeric } from '../../bcorpString'

/**
 * Takes a Video URL or ID from YouTube or Vimeo, and player parameters for both,
 * and returns the relevant player.
 */
const BCorpVideo = props => {
  const videoParams = getVideoParamsFromURL(props.url)

  if (!videoParams.videoType) {
    return null
  }

  /**
   * react-youtube available callbacks
   * @see https://www.npmjs.com/package/react-youtube
   * react-youtube available opts and player parameters
   * @see https://developers.google.com/youtube/player_parameters
   */
  if (videoParams.videoType === 'youtube') {
    return (
      <YouTube
        videoId={videoParams.videoID}
        className={props.className}
        onPlay={props.onPlay}
        {...props.youtubeProps} />
    )
  }

  /**
   * react-vimeo callbacks and options
   * all the core ones are the same as react-youtube
   *
   * sort callbacks and options as per the react-youtube api and they'll automatically be unwrapped for vimeo
   *
   * @see https://github.com/freeCodeCamp/react-vimeo/blob/master/docs/README.md
   */
  if (videoParams.videoType === 'vimeo' && !props.noVimeo) {
    return (
      <Vimeo
        videoId={videoParams.videoID}
        className={props.className}
        onPlay={props.onPlay}
        {...props.vimeoProps} />
    )
  }
}

function getVideoParamsFromURL (url) {
  let videoParams = {
    videoType: undefined,
    videoID: undefined
  }

  if (!url) {
    // if nothing is passed
    return videoParams
  }

  if (url.includes('youtu')) {
    // youtube url passed
    const youtubeID = youtubeParser(url)

    if (youtubeID) {
      videoParams = {
        videoType: 'youtube',
        videoID: youtubeID
      }
      return videoParams
    } else {
      console.warn(`Couldnt get YouTube video ID from url ${url}`)
      return videoParams
    }
  } else if (url.includes('vimeo')) {
    // vimeo url passed
    const vimeoID = vimeoParser(url)

    if (vimeoID) {
      videoParams = {
        videoType: 'vimeo',
        videoID: vimeoID
      }
      return videoParams
    } else {
      console.warn(`Couldnt get Vimeo video ID from url ${url}`)
      return videoParams
    }
  } else {
    // handle case that a possible video ID is passed instead of url

    if (stringIsNumeric(url)) {
      // currently Vimeo video IDs are all composed of 8 integers
      videoParams = {
        videoType: 'vimeo',
        videoID: url
      }
      return videoParams
    } else {
      // if not we'll assume the string is a youtube video id
      videoParams = {
        videoType: 'youtube',
        videoID: url
      }
      return videoParams
    }
  }
}

function youtubeParser (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

function vimeoParser (url) {
  const regExp = /^.*vimeo.*\/([\d]+)/
  const match = url.match(regExp)
  return (match && stringIsNumeric(match[1])) ? match[1] : false
}

BCorpVideo.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  youtubeProps: PropTypes.object,
  vimeoProps: PropTypes.object,
  noVimeo: PropTypes.bool,
  /**
   * Bit of hacky prop here just allowing lightbox youtube to add onPlay functionality,
   * we can normally just pass this within youtubeProps or vimeoProps
   * needs to be redesigned really TODO
   */
  onPlay: PropTypes.func
}

export default BCorpVideo
