// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../../types/post_types'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
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
      (this.props.post.meta && this.props.post.meta.news_category) || ''

    return <div className={style.meta}>{`${prettyDate} * ${source}`}</div>
  }

  renderContent () {
    return (
      <div className={style.content}>
        {ReactHtmlParser(this.props.post.post.post_content || '', {
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
