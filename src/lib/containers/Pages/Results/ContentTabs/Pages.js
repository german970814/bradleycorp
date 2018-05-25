// @flow
import * as React from 'react'
import Default from './Default'
import style from './../Results.scss'
import type { TemplateProps } from './Default'
import type { BCorpPost, BCorpMeta } from '../../../../../lib/types/post_types'
import { createCPTUrl } from '../../../../bcorpUrl'
import { getExcerpt } from '../../../../bcorpPost'

type BCorpMetaWithDescription = BCorpMeta

type BCorpPostWithMeta = {
  meta: BCorpMetaWithDescription
} & BCorpPost

type Props = {
  posts: Array<BCorpPostWithMeta>
} & TemplateProps

export default class PageTabResults extends React.Component<Props> {
  getExcerpt (post: BCorpPostWithMeta) {
    if (post.meta && post.meta.meta_description) {
      return post.meta.meta_description
    }

    return getExcerpt(
      post.post.post_excerpt,
      post.post.post_content || '',
      'short'
    )
  }

  renderContent () {
    return (
      <div className={`${style.resultsTextContentWrapper}`}>
        <ul className={`${style.newsList}`}>
          {this.props.posts.map((post, index) => {
            return (
              <li key={index}>
                <h5>
                  <a href={createCPTUrl(post.post) || ''}>
                    {post.post.post_title}
                  </a>
                </h5>
                <p>{this.getExcerpt(post)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
