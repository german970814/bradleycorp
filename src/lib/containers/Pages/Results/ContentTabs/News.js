// @flow
import React from 'react'
import style from './../Results.scss'
import Default from './Default'
import { createCPTUrl } from '../../../../../lib/bcorpUrl'
import { getExcerpt } from '../../../../../lib/bcorpPost'
import type { TemplateProps } from './Default'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import NewsItem from '../../../Templates/LeftSidebarTemplate/NewsTemplate/NewsItems/NewsItem/NewsItem'
import ContentTransformer from '../../../../components/ContentTransformer/ContentTransformer'

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
