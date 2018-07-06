// @flow
import React from 'react'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import type { TemplateProps } from './Default'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import ImageFrame from '../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
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
          <a key={index} href={post.meta.literature_pdf} target="_blank">
            <article className={style.literature}>
              <ImageFrame
                src={post.media.featured_image[0]}
                aspectRatio={211 / 170 * 100}
                sizing={'contain'}
              />
              <h6 className={`${style.literatureTitle}`}>
                {post.post.post_title}
              </h6>
            </article>
          </a>
        )
      })
    )
  }

  renderColumns (colClass: string, rowLength: number, gutter?: number) {
    const colClasses = getColumnClassesForGrid(colClass, rowLength)

    return (
      <div className={`${style.searchLiteratureWrapper}`}>
        <FillGrid colClasses={colClasses} gutter={gutter}>
          {this.renderLiterature()}
        </FillGrid>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.props.screenSize === 'mobile'
          ? this.renderColumns('col2', 2, 20)
          : this.props.screenSize === 'tablet'
            ? this.renderColumns('col4-tablet', 4, 15)
            : this.renderColumns('col6-desktop', 6, 30)}
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}

export default withScreenSize(SearchLiterature)
