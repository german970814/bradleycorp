import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getExcerpt } from '../../../../../../../lib/bcorpPost'
import VerticalAlignHelper from '../../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import ImageFrame from '../../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../SliderModule.scss'

class SliderItem extends Component {
  renderImage () {
    const { post } = this.props

    const imgSrc = post.media['featured_image'] && post.media['featured_image'].length !== 0
      ? post.media['featured_image'][0]
      : ''

    return (
      <div className={style.imageWrapper} >
        <ImageFrame
          src={imgSrc}
          aspectRatio={169 / 250}
          aspectRatioTablet={211 / 315}
          aspectRatioDesktop={302 / 449}
          sizing={'contain'}
          containerNode={this.props.containerNode}
          respondToContainer />
      </div>
    )
  }

  renderHeading () {
    if (!this.props.heading ||
      (this.props.size !== 'tablet' && this.props.size !== 'desktop')) {
      return
    }

    return (
      <h5 className={`${style.heading} ${this.props.accentColorClass} module-accent-color-change-text ${this.props.skinClass}`} >
        {this.props.heading}
      </h5>
    )
  }

  renderTitle () {
    const { post } = this.props

    if (!post.post['post_title']) {
      return
    }

    return (
      <h4 className={`${style.title} ${this.props.skinClass}`} >{post.post['post_title']}</h4>
    )
  }

  renderContent () {
    const { post } = this.props
    const excerpt = getExcerpt(post.post['post_excerpt'], null, 19)

    if (!excerpt) {
      return
    }

    return (
      <div className={`${style.content} ${this.props.skinClass}`} >
        {excerpt}
      </div>
    )
  }

  renderArrow () {
    return (
      <div className={style.arrowWrapper} >
        <img
          className={style.arrow}
          src={require('../../../../../../../images/arrow/arrow-brown@2x.png')} />
      </div>
    )
  }

  render () {
    return (
      <div className={`row ${style.sliderItem}`} >

        <VerticalAlignHelper />

        {this.renderImage()}

        <div className={style.contentWrapper} >

          {this.renderHeading()}

          {this.renderTitle()}

          {this.renderContent()}

          {this.renderArrow()}

        </div>

      </div>
    )
  }
}

SliderItem.propTypes = {
  post: PropTypes.object.isRequired,
  containerNode: PropTypes.object,
  size: PropTypes.string,
  heading: PropTypes.string,
  accentColorClass: PropTypes.string,
  skinClass: PropTypes.string
}

export default SliderItem
