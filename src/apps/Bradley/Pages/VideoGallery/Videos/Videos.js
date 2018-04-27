// @flow
import * as React from 'react'
import type { FiltersType } from '../VideoGallery'
import type { VideoGalleryPost } from '../../../../../lib/types/cpt_types'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import CPTApiClient from '../../../../../api/cpt_client'

type Props = {
  filters: FiltersType
}

type Video = BCorpPost & { post: VideoGalleryPost }

type VideoStateType = Array<Video>

type State = {
  videos?: VideoStateType
}

class Videos extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    this.getFilteredVideos()
  }

  componentWillReceiveProps () {
    this.getFilteredVideos()
  }

  render () {
    return null
  }

  async getFilteredVideos () {
    /*
    const testObject = {
      video_gallery_product_tag: ['product-group-a'],
      video_gallery_type_cat: ['installation']
    }
    */

    const filters = this.getFiltersFormattedForRequest()

    try {
      console.log(filters)
      const client = new CPTApiClient('video-gallery')
      const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

      const videos = response.data
      return this.setState({ videos })
    } catch (err) {
      console.log(err)
    }
  }

  getFiltersFormattedForRequest () {
    const { search, ...filters } = this.props.filters
    const formattedFilters = {}

    Object.keys(filters).forEach(filterName => {
      formattedFilters[filterName] = [filters[filterName]]
    })

    return formattedFilters
  }
}

export default Videos
