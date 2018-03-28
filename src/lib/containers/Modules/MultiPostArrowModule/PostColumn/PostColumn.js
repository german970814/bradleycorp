import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../bcorpUrl'
import { getExcerpt } from '../../../../bcorpPost'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import ImageFrame from '../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../MultiPostArrowModule.scss'

class PostColumn extends Component {
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
      <Link
        to={`${this.postLink}`}
        replace >

        <h4 className={`${style.title} ${this.props.skinClass}`} >{post.post['post_title']}</h4>

      </Link>
    )
  }

  renderContent () {
    const { post } = this.props
    const excerpt = getExcerpt(post.post['post_excerpt'], post.post['post_content'])

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
    const { arrow } = this.props

    if (arrow) {
      return (
        <Link
          to={`${this.postLink}`}
          replace >

          <div className={style.arrowWrapper} >
            <SVGIcon
              className={style.arrow}
              icon={'arrow'}
              color={this.props.skin === 'dark' ? 'white' : this.props.accentColor}
              redrawOnHover />
          </div>

        </Link>
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
  arrow: PropTypes.bool,
  containerNode: PropTypes.object,
  skin: PropTypes.string,
  accentColor: PropTypes.string,
  skinClass: PropTypes.string
}

export default PostColumn