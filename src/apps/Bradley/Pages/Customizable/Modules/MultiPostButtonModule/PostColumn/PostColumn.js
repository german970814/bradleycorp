import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getExcerpt } from '../../../../../../../lib/bcorpPost'
import Divider from '../../../../../../../lib/components/Divider/Divider'
import ImageFrame from '../../../../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './PostColumn.scss'

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
          aspectRatio={121 / 270}
          aspectRatioTablet={89 / 177}
          aspectRatioDesktop={140 / 316}
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
    const excerpt = getExcerpt(post.post['post_excerpt'], post.post['post_content'], 22)

    if (!excerpt) {
      return
    }

    return (
      <div className={style.content} >
        {excerpt}
      </div>
    )
  }

  renderButton () {
    return (
      <button className={`button-brown ${style.button}`} >{'LEARN MORE'}</button>
    )
  }

  renderDivider () {
    return <Divider fullWidth />
  }

  render () {
    const columnSizeClass = style[`post-column-${this.props.numColumns}`]
    return (
      <div className={`${columnSizeClass} ${style.postColumnWrapper}`} >

        {this.renderImage()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderButton()}
        {this.renderDivider()}

      </div>
    )
  }
}

PostColumn.propTypes = {
  post: PropTypes.object.isRequired,
  containerNode: PropTypes.object,
  numColumns: PropTypes.number.isRequired
}

export default PostColumn
