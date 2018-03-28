import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../bcorpUrl'
import { getExcerpt } from '../../../../bcorpPost'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import VerticalAlignHelper from '../../../../components/VerticalAlignHelper/VerticalAlignHelper'
import ImageFrame from '../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../SliderModule.scss'

class SliderItem extends Component {
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
      <h3 className={`${style.heading} ${this.props.accentColorClass} module-accent-color-change-text ${this.props.skinClass}`} >
        {this.props.heading}
      </h3>
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

        <h2 className={`${style.title} ${this.props.skinClass}`} >{post.post['post_title']}</h2>

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
  skin: PropTypes.string,
  accentColor: PropTypes.string,
  accentColorClass: PropTypes.string,
  skinClass: PropTypes.string
}

export default SliderItem
