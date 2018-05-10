// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../../types/post_types'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { getExcerpt } from '../../../../../../bcorpPost'
import ContentTransformer from '../../../../../Modules/transformContent/transformContent'
import style from './NewsItem.scss'

type Props = {
  post: BCorpPost
}

class NewsItem extends React.Component<Props> {
  renderTitle () {
    return (
      <h5 className={style.title}>{this.props.post.post.post_title || ''}</h5>
    )
  }

  renderMeta () {
    let prettyDate = ''
    const postDate = this.props.post.post.post_date
    if (postDate) {
      const date = new Date(postDate)
      prettyDate = moment(date).format('MMMM Do YYYY')
    }

    const source =
      this.props.post.meta && this.props.post.meta.news_category
        ? ` * ${this.props.post.meta.news_category}`
        : ''

    return (
      <div
        className={`post-meta-data ${
          style.meta
        }`}>{`${prettyDate}${source}`}</div>
    )
  }

  renderContent () {
    const excerpt = getExcerpt(
      this.props.post.post.post_excerpt,
      this.props.post.post.post_content || '',
      'long'
    )

    return (
      <div className={style.content}>
        {ReactHtmlParser(excerpt, {
          transform: (node, index) => {
            const contentTransformer = new ContentTransformer(node, index)
            return contentTransformer.transform()
          }
        })}
      </div>
    )
  }

  render () {
    return (
      <div className={style.newsItem}>
        {this.renderTitle()}
        {this.renderMeta()}
        {this.renderContent()}
      </div>
    )
  }
}

export default NewsItem
