// @flow
import * as React from 'react'
// import { Link } from 'react-router-dom'
import ContentTransformer from '../../../../../lib/components/ContentTransformer/ContentTransformer'
// import VerticalAlignHelper from '../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
// import BCorpLink from '../../../../../lib/components/BCorpLink/BCorpLink'
// import ArrowThumbnail from '../../../../../lib/components/ArrowThumbnail/ArrowThumbnail'
import style from './CategoryDescription.scss'

type Props = {
  isMobile?: boolean,
  description: string,
  logoSrc?: string
}

class CategoryDescription extends React.PureComponent<Props> {
  renderImage () {
    if (!this.props.logoSrc) {
      return
    }

    return (
      <div
        style={{ backgroundImage: `url('${this.props.logoSrc}')` }}
        className={style.featuredImage}
      />
    )
  }

  render () {
    // we dont show it at all if there is no description,
    // not even if there is still an image
    if (!this.props.description) {
      return null
    }

    return (
      <div className={`row ${style.categoryDescription}`}>
        <div className={`col1 col3-tablet ${style.descriptionIcon}`}>
          {this.renderImage()}
        </div>
        <div className={`col1 col3x2-tablet ${style.descriptionWrapper}`}>
          <div className={style.description}>
            <ContentTransformer content={this.props.description} />
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryDescription
