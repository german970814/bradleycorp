import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './PostGridItem.scss'

class PostGridItem extends Component {
  renderImage () {
    const { post } = this.props

    if (!post.media['featured_image'] || post.media['featured_image'].length === 0) {
      return (
        <div className={style.image} >
          <div className={style.imageGradient} />
        </div>
      )
    }

    const imgSrc = post.media['featured_image'][0]

    return (
      <div
        style={{
          backgroundImage: `url(${imgSrc})`
        }}
        className={style.image} >

        <div className={style.imageGradient} />

      </div>
    )
  }

  renderTitle () {
    const { post } = this.props

    if (!post.post['post_title']) {
      return
    }

    return (
      <h5 className={style.title} >{post.post['post_title']}</h5>
    )
  }

  renderArrow () {
    return (
      <div className={style.arrowWrapper} >
        <img
          className={style.arrow}
          src={require('../../../../../../../images/arrow/arrow@2x.png')} />
      </div>
    )
  }

  render () {
    const sizeClassName = style[`size-${this.props.size}`]
    return (
      <div className={`${style.postGridItem} ${sizeClassName}`} >

        {this.renderImage()}

        {this.renderTitle()}
        {this.renderArrow()}

      </div>
    )
  }
}

PostGridItem.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.string
}

export default PostGridItem
