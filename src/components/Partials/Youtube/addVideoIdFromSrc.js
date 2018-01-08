import React, { Component } from 'react'
import { youtubeParser } from '../../../lib/bcorpUrl'

const addVideoIdFromSrc = (YoutubeComponent, src) => {
  return class YoutubeVideoID extends Component {
    render () {
      const videoId = youtubeParser(src)
      return (
        <YoutubeComponent videoId={videoId} {...this.props} />
      )
    }
  }
}

export default addVideoIdFromSrc
