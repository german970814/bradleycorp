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
  links?: Array<{ name: string, link: string }>,
  description: string,
  logoSrc?: string
}

class CategoryDescription extends React.PureComponent<Props> {
  /* renderImage () {
    if (!this.props.logoSrc) {
      return
    }

    return <img src={this.props.logoSrc} />
  } */

  /*
  renderLinks () {
    return this.props.links.map((link, index) => {
      return (
        <BCorpLink
          key={index}
          url={link.link}
          renderInternal={url => {
            const linkElement = (
              <Link to={url} className={`link-orange`}>
                {link.name}
              </Link>
            )

            return this.props.isMobile ? (
              <ArrowThumbnail className={style.arrowWrapper}>
                {linkElement}
              </ArrowThumbnail>
            ) : (
              linkElement
            )
          }}
          renderExternal={url => {
            const linkElement = (
              <a href={url} className={`link-orange`}>
                {link.name}
              </a>
            )
            return this.props.isMobile ? (
              <ArrowThumbnail className={style.arrowWrapper}>
                {linkElement}
              </ArrowThumbnail>
            ) : (
              linkElement
            )
          }}
        />
      )
    })
  } */

  render () {
    /*
    return (
      <div className={`row ${style.categoryDescription}`}>
        <VerticalAlignHelper />
        <div
          className={`col1 inline-col3-middle-tablet ${style.descriptionIcon}`}>
          {this.renderImage()}
        </div>
        <div
          className={`col1 inline-col3x2-middle-tablet ${
            style.descriptionWrapper
          }`}>
          <div className={style.description}>
            <ContentTransformer content={this.props.description} />
          </div>
          <div className={style.descriptionLinks}>{this.renderLinks()}</div>
        </div>
      </div>
    )
    */

    return (
      <div className={`row ${style.categoryDescription}`}>
        <div
          className={`col1 inline-col3x2-middle-tablet ${
            style.descriptionWrapper
          }`}>
          <div className={style.description}>
            <ContentTransformer content={this.props.description} />
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryDescription
