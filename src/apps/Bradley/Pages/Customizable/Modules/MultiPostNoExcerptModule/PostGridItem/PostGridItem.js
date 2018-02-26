import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../../../../lib/bcorpUrl'
import style from './PostGridItem.scss'

class PostGridItem extends Component {
  constructor (props) {
    super(props)

    this.postLink = '#'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.post) {
      this.postLink = createCPTUrl(nextProps.post.post)
    }
  }

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
      <Link
        to={`${this.postLink}`}
        replace >

        <h5 className={style.title} >{post.post['post_title']}</h5>

      </Link>
    )
  }

  renderArrow () {
    return (
      <Link
        to={`${this.postLink}`}
        replace >

        <div className={style.arrowWrapper} >
          <img
            className={style.arrow}
            src={require('../../../../../../../images/arrow/arrow@2x.png')} />
        </div>

      </Link>
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
