// @flow
import * as React from 'react'
import style from './../Results.scss'
import type { ChildFunctionArgs } from '../../../../../lib/containers/LoadMore/LoadMore'
import Loading from '../../../../../lib/components/Loading/Loading'

type Props = {
  shouldReset: boolean
} & ChildFunctionArgs

export default class SearchDefault extends React.Component<Props> {
  componentDidMount () {
    if (this.props.shouldReset) {
      this.props.reset()
    }
  }

  renderLoadMoreButton (): ?React.Node {
    if (this.props.canLoadMore) {
      return <button onClick={this.props.loadNextPage} className={`${style.searchLoadMore}`}>Load More</button>
    }
  }

  renderContent () {
    return <div className={`${style.resultsTextContentWrapper}`}>
      <ul className={`${style.newsList}`}>
        {this.props.posts.map((post, index) => {
          return <li key={index}>
            <h5><a href="#">{post.post.post_title}</a></h5>
            <p>{post.meta.meta_description}</p>
          </li>
        })}
      </ul>
    </div>
  }

  render () {
    return Array.isArray(this.props.posts) ? (
      <div>
        {this.renderContent()}
        {this.props.loading && <Loading />}
        {this.renderLoadMoreButton()}
      </div>
    ) : <Loading />
  }
}
