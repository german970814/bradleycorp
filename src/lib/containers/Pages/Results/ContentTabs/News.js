// @flow
import React from 'react'
import type { TemplateProps } from './Default'
import Default from './Default'
import NewsItem from '../../../Templates/LeftSidebarTemplate/NewsTemplate/NewsItems/NewsItem/NewsItem'
import style from './../Results.scss'

export default class SearchNews extends React.Component<TemplateProps> {
  renderContent () {
    return (
      <div className={`${style.resultsTextContentWrapper}`}>
        <ul className={`${style.newsList}`}>
          {this.props.posts &&
            this.props.posts.map((post, index) => {
              return <NewsItem key={index} post={post} />
            })}
        </ul>
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
