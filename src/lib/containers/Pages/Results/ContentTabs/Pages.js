// @flow
import * as React from 'react'
import type { TemplateProps } from './Default'
import type { BCorpPost, BCorpMeta } from '../../../../../lib/types/post_types'
import PostTabResults from './Posts'
import style from './../Results.scss'

type BCorpMetaWithDescription = BCorpMeta

type BCorpPostWithMeta = {
  meta: BCorpMetaWithDescription
} & BCorpPost

type Props = {
  posts: Array<BCorpPostWithMeta>
} & TemplateProps

export default class PageTabResults extends React.Component<Props> {
  render () {
    return (
      <PostTabResults
        posts={this.props.posts}
        metaDescriptionReplacesExcerpt
        {...this.props}
      />
    )
  }
}
