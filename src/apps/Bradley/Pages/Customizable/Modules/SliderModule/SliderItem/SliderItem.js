import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getExcerpt } from '../../../../../../../lib/bcorpPost'
import ImageFrame from '../../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../SliderModule.scss'

class SliderItem extends Component {
  renderImage () {
    const { post } = this.props

    if (!post.media['featured_image'] || post.media['featured_image'].length === 0) {
      return
    }

    const imgSrc = post.media['featured_image'][0]

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

  renderTitle () {
    const { post } = this.props

    if (!post.post['post_title']) {
      return
    }

    return (
      <h4 className={style.title} >{post.post['post_title']}</h4>
    )
  }

  renderContent () {
    const { post } = this.props
    const excerpt = getExcerpt(post.post['post_excerpt'], undefined, 19)

    if (!excerpt) {
      return
    }

    return (
      <div className={style.content} >
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
      <div className={style.sliderItem} >

        {this.renderImage()}

        {this.renderTitle()}

        {this.renderContent()}

        {this.renderArrow()}

      </div>
    )
  }
}

SliderItem.propTypes = {
  post: PropTypes.object.isRequired,
  containerNode: PropTypes.object
}

export default SliderItem
