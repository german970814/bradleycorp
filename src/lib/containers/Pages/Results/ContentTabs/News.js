// @flow
import React from 'react'
import style from './../Results.scss'
import Default from './Default'
import { createCPTUrl } from '../../../../../lib/bcorpUrl'
import { getExcerpt } from '../../../../../lib/bcorpPost'
import type { TemplateProps } from './Default'
import type { BCorpPost } from '../../../../../lib/types/post_types'

export default class SearchNews extends React.Component<TemplateProps> {
  getDate (post: BCorpPost) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ]
    if (post.post.post_date) {
      const date = new Date(post.post.post_date)
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return null
  }

  getSource (post: BCorpPost) {
    if (post.meta.news_source) {
      return <a href={post.meta.news_source.url}>{post.meta.news_source.name}</a>
    }
  }

  renderContent () {
    return <div className={`${style.resultsTextContentWrapper}`}>
      <ul className={`${style.newsList}`}>
        {this.props.posts && this.props.posts.map((post, index) => {
          return <li key={index}>
            <h5><a href={createCPTUrl(post.post)}>{post.post.post_title}</a></h5>
            <div className={`${style.resultsDate}`}><span>{this.getDate(post)} - {this.getSource(post)}</span></div>
            <p>{getExcerpt(post.post.post_excerpt, post.post.post_content || '', 'short')}</p>
          </li>
        })}
      </ul>
    </div>
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
