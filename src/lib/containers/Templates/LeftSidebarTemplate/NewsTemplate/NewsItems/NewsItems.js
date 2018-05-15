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
  filters: FiltersType,
  category?: string
}

class NewsItems extends React.Component<Props> {
  getPosts: GetPostsFunctionType

  getPosts ({ postsPerPage, paged, offset }: GetPostsArgs) {
    const dateQuery = { year: this.props.filters.year }

    const client = new CPTApiClient('news')

    return this.props.category && this.props.category !== ''
      ? client.getByTax(
        'news_cat',
        this.props.category,
        postsPerPage,
        paged,
        offset,
        dateQuery,
        this.props.filters.search
      )
      : client.getLatest(
        postsPerPage,
        paged,
        offset,
        dateQuery,
        this.props.filters.search
      )
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
        <div className={style.buttonWrapper}>
          <button className={style.loadMore} onClick={this.props.loadNextPage}>
            {'LOAD MORE'}
          </button>
        </div>
      )
    )
  }

  render () {
    return (
      <React.Fragment>
        <div className={style.newsItems}>{this.renderNewsItems()}</div>
        {this.renderLoadMoreButton()}
      </React.Fragment>
    )
  }

  shouldResendRequest (nextProps: InnerProps) {
    return Object.keys(nextProps.filters).some(filter => {
      return nextProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default NewsItems
