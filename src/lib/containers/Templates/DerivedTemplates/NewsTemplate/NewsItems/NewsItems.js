// @flow
import * as React from 'react'
import type { FiltersType } from '../../../../ArchiveFilters/ArchiveFilters'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../LoadMore/LoadMore'
import CPTApiClient from '../../../../../../api/cpt_client'
import LoadMore from '../../../../LoadMore/LoadMore'
import NoResults from '../../../../../components/Error/NoResults/NoResults'
import NewsItem from './NewsItem/NewsItem'
import style from './NewsItems.scss'

type Props = {
  filters: FiltersType,
  category?: string,
  pageID: number,
  isCaseStudyTemplate?: boolean
}

class NewsItems extends React.Component<Props> {
  getPosts: GetPostsFunctionType

  getPosts ({ postsPerPage, paged, offset }: GetPostsArgs) {
    const dateQuery = {
      year: parseInt(this.props.filters.year.replace('_', ''))
    }

    const client = this.props.isCaseStudyTemplate
      ? new CPTApiClient('case-study')
      : new CPTApiClient('news')

    return this.props.category &&
      this.props.category !== '' &&
      !this.props.isCaseStudyTemplate
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
              isCaseStudyTemplate={this.props.isCaseStudyTemplate}
            />
          )
        }}
      </LoadMore>
    )
  }
}

type InnerProps = ChildFunctionArgs & {
  filters: FiltersType,
  pageID: number,
  isCaseStudyTemplate?: boolean
}

class NewsItemsInner extends React.Component<InnerProps> {
  componentDidUpdate (prevProps: InnerProps) {
    if (this.shouldResendRequest(prevProps)) {
      this.props.reset()
    }
  }

  renderNewsItems () {
    if (!this.props.posts) {
      return
    }

    return this.props.posts.map((post, index) => {
      if (this.props.shouldDisplayPost(index)) {
        return (
          <NewsItem
            key={index}
            post={post}
            caseStudy={this.props.isCaseStudyTemplate}
          />
        )
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
        <div className={style.newsItems}>{this.renderNewsItems()}</div>
        {this.renderLoadMoreButton()}
      </React.Fragment>
    ) : (
      <NoResults message={'No results matched your filter selections'} />
    )
  }

  shouldResendRequest (prevProps: InnerProps) {
    if (
      prevProps.pageID !== this.props.pageID ||
      prevProps.filters !== this.props.filters ||
      prevProps.isCaseStudyTemplate !== this.props.isCaseStudyTemplate
    ) {
      return true
    }

    return Object.keys(prevProps.filters).some(filter => {
      return prevProps.filters[filter] !== this.props.filters[filter]
    })
  }
}

export default NewsItems
