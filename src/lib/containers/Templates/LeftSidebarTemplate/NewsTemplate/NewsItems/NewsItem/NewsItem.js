// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../../types/post_types'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { getExcerpt } from '../../../../../../bcorpPost'
import BCorpLink from '../../../../../../components/BCorpLink/BCorpLink'
import ContentTransformer from '../../../../../Modules/transformContent/transformContent'
import style from './NewsItem.scss'

type Props = {
  post: BCorpPost
}

class NewsItem extends React.Component<Props> {
  source: ?{ name: string, url: string }
  pdf: ?string

  constructor (props: Props) {
    super(props)

    const { meta } = props.post || {}
    this.source =
      meta.news_source && meta.news_source.name && meta.news_source.url
        ? {
          name: meta.news_source.name,
          url: meta.news_source.url
        }
        : undefined

    this.pdf = meta.news_pdf && meta.news_pdf !== '' ? meta.news_pdf : undefined
  }

  renderTitle () {
    if (this.pdf) {
      return (
        <a href={this.pdf} target="_blank">
          <h5 className={style.title}>
            {this.props.post.post.post_title || ''}
          </h5>
        </a>
      )
    } else {
      const url = (this.source && this.source.url) || this.props.post.post.path
      return (
        <BCorpLink
          url={url}
          renderInternal={url => {
            return (
              <Link to={url}>
                <h5 className={style.title}>
                  {this.props.post.post.post_title || ''}
                </h5>
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a href={url} target="_blank">
                <h5 className={style.title}>
                  {this.props.post.post.post_title || ''}
                </h5>
              </a>
            )
          }}
        />
      )
    }
  }

  renderMeta () {
    let prettyDate = ''
    const postDate = this.props.post.post.post_date
    if (postDate) {
      const date = new Date(postDate)
      prettyDate = moment(date).format('MMMM Do YYYY')
    }

    return this.source ? (
      <a href={this.source.url} target="_blank">
        <div className={`post-meta-data ${style.meta}`}>{`${prettyDate} * ${
          this.source.name
        }`}</div>
      </a>
    ) : (
      <div className={`post-meta-data ${style.meta}`}>{`${prettyDate}`}</div>
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
    console.log(this.props.post.meta)
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
