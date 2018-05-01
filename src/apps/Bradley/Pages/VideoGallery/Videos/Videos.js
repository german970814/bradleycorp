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

const postsPerPage: number = 20

type Props = {
  filters: FiltersType
}

type VideoType = BCorpPost & { post: VideoGalleryPost }

type VideoStateType = Array<VideoType>

type State = {
  videos?: VideoStateType,
  loading: boolean,
  paged: number
}

class Videos extends React.Component<Props, State> {
  getFilteredVideosDebounced: (props: Props, paged: number) => void
  getFilteredVideosDebouncedNext: (props: Props, paged: number) => void

  constructor (props: Props) {
    super(props)

    this.state = { loading: true, paged: 1 }

    // we need this function twice
    // otherwise when fetching the new videos after changing filters
    // it would only send the request for the second page
    // since the request for the second page would debounce the first
    this.getFilteredVideosDebounced = debounce(this.getFilteredVideos, 1500)
    this.getFilteredVideosDebouncedNext = debounce(this.getFilteredVideos, 2000)
  }

  componentDidMount () {
    this.getFilteredVideos(this.props, 1)
    this.getFilteredVideosDebounced(this.props, 2)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.shouldResendRequest(nextProps)) {
      //
      // always get the first page when we get new filters
      //
      this.setState({ loading: true, paged: 1, videos: undefined })
      this.getFilteredVideosDebounced(nextProps, 1)
      this.getFilteredVideosDebouncedNext(nextProps, 2)
    }
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    // if we 'load more' we need to request the next page
    if (prevState.paged !== this.state.paged) {
      this.getFilteredVideos(this.props, this.state.paged + 1)
    }
  }

  renderVideos () {
    if (!this.state.videos || !this.state.videos.length) {
      return null
    }

    let videos = []
    this.state.videos.forEach((video, index) => {
      //
      // although we may have more videos,
      // we only show the ones for the current page
      //
      if (index >= postsPerPage * this.state.paged) {
        return
      }
      //

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

  renderLoadMoreButton () {
    if (
      !this.state.loading &&
      this.state.videos &&
      this.state.videos.length > postsPerPage * this.state.paged
    ) {
      const paged: number = this.state.paged + 1
      return (
        <button
          className={style.loadMore}
          onClick={() => this.setState({ paged })}>
          {'LOAD MORE'}
        </button>
      )
    }
  }

  render () {
    console.log(this.state)
    return (
      <div className={style.wrapper}>
        <div className={`row ${style.videos}`}>
          {this.state.loading ? <Loading /> : this.renderVideos()}
        </div>
        {this.renderLoadMoreButton()}
      </div>
    )
  }

  async getFilteredVideos (props: Props, paged: number) {
    const filters = this.getFiltersFormattedForRequest(props)

    try {
      console.log('sending', filters, paged)
      const client = new CPTApiClient('video-gallery')
      const response = await client.getByTaxNameAndTermSlugObject(
        filters,
        'OR',
        postsPerPage,
        paged
      )

      let videos: Array<VideoType> = response.data

      console.log(`got ${videos.length} videos`, paged)

      const prevVideos = this.state.videos || []
      videos = [...prevVideos, ...videos]

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
