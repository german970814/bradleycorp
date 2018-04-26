// @flow
import * as React from 'react'
import type { VideoGalleryPost } from '../../../../lib/types/cpt_types'
import type { BCorpPost } from '../../../../lib/types/post_types'
import CPTApiClient from '../../../../api/cpt_client'

const videoTypeDefault: 'videoType' = 'videoType'
const productTypeDefault: 'productType' = 'productType'

type FiltersType = {
  videoType: string,
  productType: string,
  search?: string
}

type Video = BCorpPost & { post: VideoGalleryPost }

type Props = {}

type State = {
  filters: FiltersType,
  videos?: Array<Video>
}

class VideoGallery extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {
        videoType: videoTypeDefault,
        productType: productTypeDefault,
        search: ''
      }
    }
  }

  render () {
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
