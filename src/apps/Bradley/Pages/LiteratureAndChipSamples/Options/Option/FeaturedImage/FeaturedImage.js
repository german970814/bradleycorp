// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../../lib/types/cpt_types'
import LightboxV2 from '../../../../../../../lib/containers/Lightbox/LightboxV2'
import style from './FeaturedImage.scss'

type Props = {
  post: LiteraturePost | ChipSamplePost
}

type State = {
  isHovered: boolean
}

class FeaturedImage extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isHovered: false
    }
  }

  onMouseEnter (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: true })
  }

  onMouseLeave (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: false })
  }

  renderOverlay () {
    return this.state.isHovered ? (
      <React.Fragment>
        <div className={style.overlay} />
        <img
          className={style.viewIcon}
          src={require('../../../../../../../images/view-icon/view-icon@2x.png')}
        />
        <h6 className={style.view}>{'VIEW'}</h6>
      </React.Fragment>
    ) : null
  }

  render () {
    if (this.props.post.media.featured_image.constructor !== Array) {
      return null
    }

    return this.props.post.post.post_type === 'literature' ? (
      <a href={this.props.post.meta.literature_pdf} target="_blank">
        <div
          className={style.featuredImage}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}>
          <img
            src={this.props.post.media.featured_image[0]}
            className={'row'}
          />
          {this.renderOverlay()}
        </div>
      </a>
    ) : (
      <LightboxV2
        renderChildren={openLightbox => {
          return (
            <div
              className={style.featuredImage}
              onClick={openLightbox}
              onMouseEnter={this.onMouseEnter.bind(this)}
              onMouseLeave={this.onMouseLeave.bind(this)}>
              <img
                src={this.props.post.media.featured_image[0]}
                className={'row'}
              />
              {this.renderOverlay()}
            </div>
          )
        }}
        renderLightboxContents={() => {
          return (
            <img
              src={this.props.post.media.featured_image[0]}
              className={`row ${style.lightboxImage}`}
            />
          )
        }}
      />
    )
  }
}

export default FeaturedImage
