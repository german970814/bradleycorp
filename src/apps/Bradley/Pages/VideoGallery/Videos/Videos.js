// @flow
import * as React from 'react'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../../lib/containers/LoadMore/LoadMore'
import type { FiltersType } from '../VideoGallery'
import { vimeoParser } from '../../../../../lib/components/BCorpVideo/BCorpVideo'
import { filterDefault } from '../VideoGallery'
import { sortIntoRows } from '../../../../../lib/bcorpJSX'
import LoadMore from '../../../../../lib/containers/LoadMore/LoadMore'
import Video from './Video/Video'
import CPTApiClient from '../../../../../api/cpt_client'
import style from './Videos.scss'

type Props = {
  filters: FiltersType
}

/**
 * On the fly HOC just to set up the LoadMore pagination component
 * and inject its' state and methods into our actual Videos component
 */
class Videos extends React.Component<Props> {
  getPosts: GetPostsFunctionType

  getPosts ({ postsPerPage, paged, offset }: GetPostsArgs) {
    const filters = this.getFiltersFormattedForRequest()

    const client = new CPTApiClient('video-gallery')
    return client.getByTaxNameAndTermSlugObject(
      filters,
      'OR',
      postsPerPage,
      paged,
      offset,
      null,
      this.props.filters.search
    )
  }

  render () {
    return (
      <LoadMore postsPerPage={20} getPosts={this.getPosts.bind(this)}>
        {({
          posts,
          postsPerPage,
          paged,
          offset,
          canLoadMore,
          shouldDisplayPost,
          loadNextPage,
          reset
        }: ChildFunctionArgs) => {
          return (
            <VideosInner
              filters={this.props.filters}
              posts={posts}
              postsPerPage={postsPerPage}
              paged={paged}
              offset={offset}
              canLoadMore={canLoadMore}
              shouldDisplayPost={shouldDisplayPost}
              loadNextPage={loadNextPage}
              reset={reset}
            />
          )
        }}
      </LoadMore>
    )
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
}

type VideosInnerProps = ChildFunctionArgs & { filters: FiltersType }

/**
 * Our actual Videos component where we add the render logic and
 * put the pagination methods to use
 */
class VideosInner extends React.Component<VideosInnerProps> {
  componentWillReceiveProps (nextProps: VideosInnerProps) {
    if (this.shouldResendRequest(nextProps)) {
      this.props.reset()
    }
  }

  renderVideos () {
    if (!this.props.posts || !this.props.posts.length) {
      return null
    }

    let videos = []
    this.props.posts.forEach((video, index) => {
      //
      // although we may have more videos,
      // we only show the ones for the current page
      //
      if (!this.props.shouldDisplayPost(index)) {
        return
      }

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
    // only render it if we actually have more to load
    return (
      this.props.canLoadMore && (
        <button className={style.loadMore} onClick={this.props.loadNextPage}>
          {'LOAD MORE'}
        </button>
      )
    )
  }

  render () {
    return (
      <div className={style.wrapper}>
        <div className={`row ${style.videos}`}>{this.renderVideos()}</div>
        {this.renderLoadMoreButton()}
      </div>
    )
  }

  shouldResendRequest (nextProps: VideosInnerProps) {
    return Object.keys(nextProps.filters).some(filter => {
      return nextProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default Videos
