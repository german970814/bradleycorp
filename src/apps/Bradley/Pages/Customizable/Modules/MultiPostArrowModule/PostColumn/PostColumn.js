import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getExcerpt } from '../../../../../../../lib/bcorpPost'
import ImageFrame from '../../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../MultiPostArrowModule.scss'

class PostColumn extends Component {
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
          aspectRatio={121 / 125}
          aspectRatioTablet={114 / 161}
          aspectRatioDesktop={156 / 205}
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
    const excerpt = getExcerpt(post.post['post_excerpt'], post.post['post_content'], 12)

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
    const { size } = this.props

    if (size === 'tablet' || size === 'desktop') {
      return (
        <div className={style.arrowWrapper} >
          <img
            className={style.arrow}
            src={require('../../../../../../../images/arrow/arrow@2x.png')} />
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div className={style.postColumn} >

        {this.renderImage()}

        {this.renderTitle()}

        {this.renderContent()}

        {this.renderArrow()}

      </div>
    )
  }
}

PostColumn.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.string,
  containerNode: PropTypes.object
}

export default PostColumn
