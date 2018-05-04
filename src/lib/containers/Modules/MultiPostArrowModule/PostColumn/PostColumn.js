// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../types/post_types.js'
import type {
  BCorpSkin,
  BCorpColor
} from '../../../../types/styleguide_types.js'
import { Link } from 'react-router-dom'
import { createCPTUrl } from '../../../../bcorpUrl'
import { getExcerpt } from '../../../../bcorpPost'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import ImageFrame from '../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from '../MultiPostArrowModule.scss'

type Props = {
  post: BCorpPost,
  arrow?: boolean,
  containerNode?: HTMLElement,
  skin?: BCorpSkin,
  accentColor?: BCorpColor,
  skinClass?: string
}

class PostColumn extends Component<Props> {
  postLink: string

  constructor (props: Props) {
    super(props)

    this.postLink = createCPTUrl(props.post.post) || '#'
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.post) {
      const link = createCPTUrl(nextProps.post.post)
      this.postLink = link || '#'
    }
  }

  renderImage () {
    const { post } = this.props

    if (
      !post.media['featured_image'] ||
      post.media['featured_image'].length === 0
    ) {
      return
    }

    const imgSrc = post.media['featured_image'][0]

    return (
      <div className={style.imageWrapper}>
        <ImageFrame
          src={imgSrc}
          aspectRatio={121 / 125}
          aspectRatioTablet={114 / 161}
          aspectRatioDesktop={156 / 205}
          containerNode={this.props.containerNode}
          respondToContainer
        />
      </div>
    )
  }

  renderTitle () {
    const { post } = this.props

    if (!post.post['post_title']) {
      return
    }

    return (
      <Link to={`${this.postLink}`}>
        <h4 className={`${style.title} ${this.props.skinClass || ''}`}>
          {post.post['post_title']}
        </h4>
      </Link>
    )
  }

  renderContent () {
    const { post } = this.props
    const excerpt = getExcerpt(
      post.post['post_excerpt'],
      post.post['post_content'] || '',
      'short'
    )

    if (!excerpt) {
      return
    }

    return (
      <div
        className={`${style.content} ${this.props.skinClass || ''}`}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    )
  }

  renderArrow () {
    const { arrow } = this.props

    if (arrow) {
      return (
        <Link to={`${this.postLink}`}>
          <div className={style.arrowWrapper}>
            <SVGIcon
              className={style.arrow}
              icon={'arrow'}
              color={
                this.props.skin === 'dark' ? 'white' : this.props.accentColor
              }
              redrawOnHover
            />
          </div>
        </Link>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div className={style.postColumn}>
        {this.renderImage()}

        {this.renderTitle()}

        {this.renderContent()}

        {this.renderArrow()}
      </div>
    )
  }
}

export default PostColumn
