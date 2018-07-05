// @flow
import * as React from 'react'
import style from './../Results.scss'
import type { ChildFunctionArgs } from '../LoadMore'
import Loading from '../../../../../lib/components/Loading/Loading'

type TemplateProps = {} & ChildFunctionArgs

type Props = TemplateProps & {
  render: () => ?React.Node
}

export default class SearchDefault extends React.Component<Props> {
  renderLoadMoreButton (): ?React.Node {
    if (this.props.canLoadMore) {
      return (
        <button
          onClick={this.props.loadNextPage}
          className={`${style.searchLoadMore}`}>
          Load More
        </button>
      )
    }
  }

  render () {
    return Array.isArray(this.props.posts) ? (
      <div>
        {this.props.render()}
        {this.props.loading && <Loading />}
        {this.renderLoadMoreButton()}
      </div>
    ) : (
      <Loading />
    )
  }
}

export type { TemplateProps }
