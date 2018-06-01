// @flow
import React from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'
import type { TemplateProps } from './Default'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'

type Props = {
  posts: Array<LiteraturePost>
} & TemplateProps

export default class SearchLiterature extends React.Component<Props> {
  renderLiterature () {
    return this.props.posts && this.props.posts.map((post, index) => {
      return <article key={index}>
        <div className={`${style.literatureImageContainer}`}>
          <a href={post.meta.literature_pdf} target="_blank">
            <img src={post.media.featured_image[0]} />
          </a>
        </div>
        <a href={post.meta.literature_pdf} target="_blank">
          <h6 className={`${style.literatureTitle}`}>{post.post.post_title}</h6>
        </a>
      </article>
    })
  }

  renderColumns (classes: string) {
    return <div className={`${style.searchLiteratureWrapper}`}>
      <FillColumns colClasses={[
        `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}`
      ]}>
        {this.renderLiterature()}
      </FillColumns>
    </div>
  }

  renderContent () {
    return <div>
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            this.renderColumns('col2')
          ) : <Media query={{ maxWidth: TABLETMAXWIDTH }}>
            {match =>
              match ? (
                this.renderColumns('col4-tablet') // tablet
              ) : this.renderColumns('col6-desktop') // desktop
            }
          </Media>
        }
      </Media>
    </div>
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
