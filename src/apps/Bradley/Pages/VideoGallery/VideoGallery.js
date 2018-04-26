// @flow
import * as React from 'react'
import Videos from './Videos/Videos'

const videoTypeDefault: 'videoType' = 'videoType'
const productTypeDefault: 'productType' = 'productType'

type FiltersType = {
  video_gallery_type_cat: string,
  video_gallery_product_tag: string,
  search?: string
}

type Props = {}

type State = {
  filters: FiltersType
}

class VideoGallery extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {
        video_gallery_type_cat: videoTypeDefault,
        video_gallery_product_tag: productTypeDefault,
        search: ''
      }
    }
  }

  render () {
    return <Videos filters={this.state.filters} />
  }
}

export default VideoGallery

export type { FiltersType }
