// @flow
import * as React from 'react'
import type { FiltersType } from '../VideoGallery'
import type { VideoGalleryPost } from '../../../../../lib/types/cpt_types'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import { filterDefault } from '../VideoGallery'
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

  componentWillReceiveProps (nextProps: Props) {
    if (this.shouldResendRequest(nextProps)) {
      this.getFilteredVideos()
    }
  }

  render () {
    console.log(this.state)
    return null
  }

  async getFilteredVideos () {
    const filters = this.getFiltersFormattedForRequest()

    try {
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
      if (filters[filterName] !== filterDefault) {
        // if all filters are set to all we'll get all available videos
        // since we'll be left with formattedFilters as an empty object
        //
        // passing an empty object to the APIClient will get all
        formattedFilters[filterName] = [filters[filterName]]
      }
    })

    return formattedFilters
  }

  shouldResendRequest (nextProps: Props) {
    return Object.keys(nextProps.filters).some(filter => {
      return nextProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default Videos
