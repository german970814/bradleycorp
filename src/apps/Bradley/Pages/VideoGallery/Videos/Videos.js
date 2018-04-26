// @flow
import * as React from 'react'
import type { FiltersType } from '../VideoGallery'
import type { VideoGalleryPost } from '../../../../../lib/types/cpt_types'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import { filterDefault } from '../VideoGallery'
import Video from './Video/Video'
import CPTApiClient from '../../../../../api/cpt_client'
import style from './Videos.scss'

type Props = {
  filters: FiltersType
}

type VideoType = BCorpPost & { post: VideoGalleryPost }

type VideoStateType = Array<VideoType>

type State = {
  videos?: VideoStateType
}

class Videos extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    this.getFilteredVideos(this.props)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.shouldResendRequest(nextProps)) {
      this.getFilteredVideos(nextProps)
    }
  }

  render () {
    console.log(this.state)
    return (
      <div className={style.videos}>
        {this.state.videos && this.state.videos.length
          ? this.state.videos.map((video, index) => {
            return <Video key={index} video={video} />
          })
          : null}
      </div>
    )
  }

  async getFilteredVideos (props: Props) {
    const filters = this.getFiltersFormattedForRequest(props)
    console.log('requesting', filters)

    try {
      const client = new CPTApiClient('video-gallery')
      const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

      const videos: Array<VideoType> = response.data
      return this.setState({ videos })
    } catch (err) {
      console.log(err)
    }
  }

  getFiltersFormattedForRequest (props: Props) {
    const { search, ...filters } = props.filters
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
