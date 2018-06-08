import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../bcorpUrl'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import style from './PostGridItem.scss'

class PostGridItem extends Component {
  constructor (props) {
    super(props)

    this.postLink = createCPTUrl(props.post.post) || '#'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.post) {
      this.postLink = createCPTUrl(nextProps.post.post) || '#'
    }
  }

  renderImage () {
    const { post } = this.props

    if (
      !post.media['featured_image'] ||
      post.media['featured_image'].length === 0
    ) {
      return (
        <div className={style.image}>
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
        className={style.image}>
        <div className={style.imageGradient} />
      </div>
    )
  }

  renderTitle () {
    const { post } = this.props

    if (!post.post['post_title']) {
      return
    }

    return <h5 className={style.title}>{post.post['post_title']}</h5>
  }

  renderArrow () {
    return (
      <div className={style.arrowWrapper}>
        <SVGIcon
          className={style.arrow}
          icon={'arrow'}
          color={'white'}
          redrawOnHover
        />
      </div>
    )
  }

  render () {
    return (
      <div className={`${style.postGridItem} ${this.props.containerClassName}`}>
        <Link to={`${this.postLink}`}>
          {this.renderImage()}

          {this.renderTitle()}
          {this.renderArrow()}
        </Link>
      </div>
    )
  }
}

PostGridItem.propTypes = {
  post: PropTypes.object.isRequired,
  containerClassName: PropTypes.string
}

export default PostGridItem
