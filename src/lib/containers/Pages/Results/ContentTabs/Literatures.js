// @flow
import React from 'react'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import type { TemplateProps } from './Default'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import { withScreenSize } from '../../../../contexts/ScreenSizeContext'
import FillGrid, {
  getColumnClassesForGrid
} from '../../../../components/FillGrid/FillGrid'
import style from './../Results.scss'
import Default from './Default'

type Props = {
  posts: Array<LiteraturePost>,
  // from withScreenSize HOC
  screenSize: ScreenSize
} & TemplateProps

class SearchLiterature extends React.Component<Props> {
  renderLiterature () {
    return (
      this.props.posts &&
      this.props.posts.map((post, index) => {
        return (
          <article key={index}>
            <div className={`${style.literatureImageContainer}`}>
              <a href={post.meta.literature_pdf} target="_blank">
                <img src={post.media.featured_image[0]} />
              </a>
            </div>
            <a href={post.meta.literature_pdf} target="_blank">
              <h6 className={`${style.literatureTitle}`}>
                {post.post.post_title}
              </h6>
            </a>
          </article>
        )
      })
    )
  }

  renderColumns (colClass: string, rowLength: number) {
    const colClasses = getColumnClassesForGrid(colClass, rowLength)

    return (
      <div className={`${style.searchProductsWrapper}`}>
        <FillGrid colClasses={colClasses}>{this.renderLiterature()}</FillGrid>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.props.screenSize === 'mobile'
          ? this.renderColumns('col2', 2)
          : this.props.screenSize === 'tablet'
            ? this.renderColumns('col4-tablet', 4)
            : this.renderColumns('col6-desktop', 6)}
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}

export default withScreenSize(SearchLiterature)
