import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../../../bcorpUrl'
import { getExcerpt } from '../../../../../../bcorpPost'
import { lookupColor } from '../../../../../../bcorpStyles'
import Divider from '../../../../../../components/Divider/Divider'
import ImageFrame from '../../../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './PostColumn.scss'

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

  renderButton () {
    return (
      <div className={style.buttonWrapper} >

        <Link
          to={`${this.postLink}`}
          replace >

          <button className={`button-brown ${style.button} ${this.props.accentColorClass}`} >{'LEARN MORE'}</button>

        </Link>

      </div>
    )
  }

  renderDivider () {
    const color = this.props.skin === 'dark' ? lookupColor('charcoal-grey') : undefined
    return <Divider color={color} fullWidth />
  }

  render () {
    const columnSizeClass = style[`post-column-${this.props.numColumns}`]
    return (
      <div className={`${columnSizeClass} ${style.postColumnWrapper} ${this.props.containerClassName} ${this.props.skinClass}`} >

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
  numColumns: PropTypes.number.isRequired,
  containerClassName: PropTypes.string,
  accentColorClass: PropTypes.string,
  skinClass: PropTypes.string,
  skin: PropTypes.string
}

export default PostColumn
