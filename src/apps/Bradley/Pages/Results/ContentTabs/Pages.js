// @flow
import * as React from 'react'
import Default from './Default'
import style from './../Results.scss'
import type { TemplateProps } from './Default'
import type { BCorpPost, BCorpMeta } from '../../../../../lib/types/post_types'

type BCorpMetaWithDescription = {
  meta_description: string
} & BCorpMeta

type BCorpPostWithMeta = {
  meta: BCorpMetaWithDescription
} & BCorpPost

type Props = {
  posts: Array<BCorpPostWithMeta>,
} & TemplateProps

export default class PageTabResults extends React.Component<Props> {
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
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
