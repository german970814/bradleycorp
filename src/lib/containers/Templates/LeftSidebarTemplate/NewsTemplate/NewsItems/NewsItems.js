// @flow
import * as React from 'react'
import type { FiltersType } from '../NewsTemplate'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../LoadMore/LoadMore'
import CPTApiClient from '../../../../../../api/cpt_client'
import LoadMore from '../../../../LoadMore/LoadMore'
import NewsItem from './NewsItem/NewsItem'
import style from './NewsItems.scss'

type Props = {
  filters: FiltersType
}

class NewsItems extends React.Component<Props> {
  getPosts: GetPostsFunctionType

  getPosts ({ postsPerPage, paged, offset }: GetPostsArgs) {
    const dateQuery = { year: this.props.filters.year }

    const client = new CPTApiClient('news')
    return client.getLatest(postsPerPage, paged, offset, dateQuery)
  }

  render () {
    return (
      <LoadMore postsPerPage={8} getPosts={this.getPosts.bind(this)}>
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
            <NewsItemsInner
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
}

type InnerProps = ChildFunctionArgs & { filters: FiltersType }

class NewsItemsInner extends React.Component<InnerProps> {
  componentWillReceiveProps (nextProps: InnerProps) {
    if (this.shouldResendRequest(nextProps)) {
      this.props.reset()
    }
  }

  renderNewsItems () {
    if (!this.props.posts) {
      return
    }

    return this.props.posts.map((post, index) => {
      if (this.props.shouldDisplayPost(index)) {
        return <NewsItem key={index} post={post} />
      }
    })
  }

  renderLoadMoreButton () {
    return (
      this.props.canLoadMore && (
        <button onClick={this.props.loadNextPage}>{'LOAD MORE'}</button>
      )
    )
  }

  render () {
    return (
      <div className={style.newsItems}>
        {this.renderNewsItems()}
        {this.renderLoadMoreButton()}
      </div>
    )
  }

  shouldResendRequest (nextProps: InnerProps) {
    return Object.keys(nextProps.filters).some(filter => {
      return nextProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default NewsItems
