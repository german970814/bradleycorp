// @flow
import * as React from 'react'
import CPTApiClient from '../../../../api/cpt_client'

type Props = {}

class VideoGallery extends React.Component<Props> {
  render () {
    console.log(this.getFilteredVideos())
    return null
  }

  async getFilteredVideos () {
    const testObject = {
      video_gallery_product_tag: ['product-group-a'],
      video_gallery_type_cat: ['installation']
    }

    try {
      const client = new CPTApiClient('video-gallery')
      const response = await client.getByTaxNameAndTermSlugObject(
        testObject,
        'OR'
      )

      const data = response.data
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }
}

export default VideoGallery
