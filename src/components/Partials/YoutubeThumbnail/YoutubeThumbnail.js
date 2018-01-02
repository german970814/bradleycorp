import React, { Component } from 'react'
import { youtubeParser } from '../../../lib/bcorpUrl'

const addVideoIdFromSrc = (YoutubeComponent, src, openLightbox) => {
  return class YoutubeThumbnail extends Component {
    render () {
      const videoId = youtubeParser(src)
      return (
        <YoutubeComponent videoId={videoId} {...this.props} />
      )
    }
  }
}

export default addVideoIdFromSrc
