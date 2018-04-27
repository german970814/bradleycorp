// @flow
import * as React from 'react'
import debounce from 'debounce'
import type { FiltersType } from '../VideoGallery'
import type { VideoGalleryPost } from '../../../../../lib/types/cpt_types'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import { vimeoParser } from '../../../../../lib/components/BCorpVideo/BCorpVideo'
import { filterDefault } from '../VideoGallery'
import { sortIntoRows } from '../../../../../lib/bcorpJSX'
import Loading from '../../../../../lib/components/Loading/Loading'
import Video from './Video/Video'
import CPTApiClient from '../../../../../api/cpt_client'
import style from './Videos.scss'

type Props = {
  filters: FiltersType
}

type VideoType = BCorpPost & { post: VideoGalleryPost }

type VideoStateType = Array<VideoType>

type State = {
  videos?: VideoStateType,
  loading: boolean
}

class Videos extends React.Component<Props, State> {
  getFilteredVideosDebounced: (props: Props) => void

  constructor (props: Props) {
    super(props)

    this.state = { loading: true }

    this.getFilteredVideosDebounced = debounce(this.getFilteredVideos, 1500)
  }

  componentDidMount () {
    this.getFilteredVideos(this.props)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.shouldResendRequest(nextProps)) {
      this.setState({ loading: true })
      this.getFilteredVideosDebounced(nextProps)
    }
  }

  renderVideos () {
    if (!this.state.videos || !this.state.videos.length) {
      return null
    }

    let videos = []
    this.state.videos.forEach((video, index) => {
      const url = video.meta.video_gallery_video
        ? video.meta.video_gallery_video
        : ''

      // skip vimeo videos and videos without url
      if (!vimeoParser(url) && url !== '') {
        videos = [...videos, <Video key={index} video={video} />]
      }
    })

    return sortIntoRows(videos, 2)
  }

  render () {
    console.log(this.state)
    return (
      <div className={`row ${style.videos}`}>
        {this.state.loading ? <Loading /> : this.renderVideos()}
      </div>
    )
  }

  async getFilteredVideos (props: Props) {
    const filters = this.getFiltersFormattedForRequest(props)

    try {
      console.log('sending', filters)
      const client = new CPTApiClient('video-gallery')
      const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

      const videos: Array<VideoType> = response.data
      return this.setState({ videos, loading: false })
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
