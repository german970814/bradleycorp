// @flow
import * as React from 'react'
import type { TemplateProps } from './Default'
import type { BCorpPost, BCorpMeta } from '../../../../../lib/types/post_types'
import { createCPTUrl } from '../../../../bcorpUrl'
import { getExcerpt } from '../../../../bcorpPost'
import Default from './Default'
import ContentTransformer from '../../../../components/ContentTransformer/ContentTransformer'
import style from './../Results.scss'

type BCorpMetaWithDescription = BCorpMeta

type BCorpPostWithMeta = {
  meta: BCorpMetaWithDescription
} & BCorpPost

type Props = {
  posts: Array<BCorpPostWithMeta>,
  hideExcerpt?: boolean,
  metaDescriptionReplacesExcerpt?: boolean
} & TemplateProps

export default class PostTabResults extends React.Component<Props> {
  getExcerpt (post: BCorpPostWithMeta) {
    let excerpt = ''

    if (this.props.metaDescriptionReplacesExcerpt) {
      if (post.meta && post.meta.meta_description) {
        excerpt = post.meta.meta_description
      }
    } else {
      excerpt = getExcerpt(
        post.post.post_excerpt,
        post.post.post_content || '',
        'short'
      )
    }

    return <ContentTransformer content={excerpt} />
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
                {!this.props.hideExcerpt && <p>{this.getExcerpt(post)}</p>}
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
