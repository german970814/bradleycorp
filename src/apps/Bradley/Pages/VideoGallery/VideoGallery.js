// @flow
import * as React from 'react'

type Props = {}

class VideoGallery extends React.Component<Props> {
  render () {
    const args = {
      video_gallery_product_tag: ['product-group-a'],
      video_gallery_type_cat: ['installation']
    }
    console.log(encodeURIComponent(JSON.stringify(args)))
    return null
  }
}

export default VideoGallery
