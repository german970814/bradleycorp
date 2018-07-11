// @flow
import * as React from 'react'
import type { FiltersType } from '../../ArchiveTemplate'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../../LoadMore/LoadMore'
import CPTApiClient from '../../../../../../../api/cpt_client'
import LoadMore from '../../../../../LoadMore/LoadMore'
import NoResults from '../../../../../../components/Error/NoResults/NoResults'
import PostRemaining from '../../../../../Pages/BlogLandingPage/Posts/PostRemaining/PostRemaining'
import style from './BlogArchiveItems.scss'

type Props = {
  filters: FiltersType,
  pageID: number
}

class BlogArchiveItems extends React.Component<Props> {
  getPosts: GetPostsFunctionType

  getPosts ({ postsPerPage, paged, offset }: GetPostsArgs) {
    const dateQuery = {
      year: parseInt(this.props.filters.year.replace('_', ''))
    }

    const client = new CPTApiClient('post')

    return client.getLatest(
      postsPerPage,
      paged,
      offset,
      dateQuery,
      this.props.filters.search
    )
  }

  render () {
    return (
      <LoadMore postsPerPage={10} getPosts={this.getPosts.bind(this)}>
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
            <BlogArchiveItemsInner
              posts={posts}
              postsPerPage={postsPerPage}
              paged={paged}
              offset={offset}
              canLoadMore={canLoadMore}
              shouldDisplayPost={shouldDisplayPost}
              loadNextPage={loadNextPage}
              reset={reset}
              filters={this.props.filters}
              pageID={this.props.pageID}
            />
          )
        }}
      </LoadMore>
    )
  }
}

type InnerProps = ChildFunctionArgs & {
  filters: FiltersType,
  pageID: number
}

class BlogArchiveItemsInner extends React.Component<InnerProps> {
  componentDidUpdate (prevProps: InnerProps) {
    if (this.shouldResendRequest(prevProps)) {
      this.props.reset()
    }
  }

  renderItems () {
    if (!this.props.posts) {
      return
    }

    return this.props.posts.map((post, index) => {
      if (this.props.shouldDisplayPost(index)) {
        return <PostRemaining key={index} post={post} />
      }
    })
  }

  renderLoadMoreButton () {
    return (
      this.props.canLoadMore && (
        <div className={style.buttonWrapper}>
          <button className={style.loadMore} onClick={this.props.loadNextPage}>
            {'LOAD MORE'}
          </button>
        </div>
      )
    )
  }

  render () {
    return this.props.posts.length ? (
      <React.Fragment>
        <div className={style.blogArchiveItems}>{this.renderItems()}</div>
        {this.renderLoadMoreButton()}
      </React.Fragment>
    ) : (
      <NoResults message={'No results matched your filter selections'} />
    )
  }

  shouldResendRequest (prevProps: InnerProps) {
    if (
      prevProps.pageID !== this.props.pageID ||
      prevProps.filters !== this.props.filters
    ) {
      return true
    }

    return Object.keys(prevProps.filters).some(filter => {
      return prevProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default BlogArchiveItems
