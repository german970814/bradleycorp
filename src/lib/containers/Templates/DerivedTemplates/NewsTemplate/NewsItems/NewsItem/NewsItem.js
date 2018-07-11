// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../../../types/post_types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { createCPTUrl } from '../../../../../../bcorpUrl'
import { getExcerpt } from '../../../../../../bcorpPost'
import ContentTransformer from '../../../../../../components/ContentTransformer/ContentTransformer'
import style from './NewsItem.scss'

type Props = {
  post: BCorpPost,
  caseStudy?: boolean
}

class NewsItem extends React.Component<Props> {
  source: ?{ name: string, url: string }
  pdf: ?string

  constructor (props: Props) {
    super(props)

    const { meta } = props.post || {}
    this.source =
      !this.props.caseStudy &&
      meta.news_source &&
      (meta.news_source.name && meta.news_source.name !== '') &&
      (meta.news_source.url && meta.news_source.url !== '')
        ? {
          name: meta.news_source.name,
          url: meta.news_source.url
        }
        : undefined

    if (this.props.caseStudy) {
      this.pdf =
        meta.case_study_pdf && meta.case_study_pdf !== ''
          ? meta.case_study_pdf
          : undefined
    } else {
      this.pdf =
        meta.news_pdf && meta.news_pdf !== '' ? meta.news_pdf : undefined
    }
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
      return this.source && this.source.url ? (
        <a href={this.source.url} target="_blank">
          <h5 className={style.title}>
            {this.props.post.post.post_title || ''}
          </h5>
        </a>
      ) : (
        <Link to={createCPTUrl(this.props.post.post) || '#'}>
          <h5 className={style.title}>
            {this.props.post.post.post_title || ''}
          </h5>
        </Link>
      )
    }
  }

  renderMeta () {
    if (this.props.caseStudy) {
      return null
    }

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
        <ContentTransformer content={excerpt} />
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
