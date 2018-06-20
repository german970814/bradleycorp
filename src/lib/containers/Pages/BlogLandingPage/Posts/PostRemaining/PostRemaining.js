// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../../types/post_types'
import type { ScreenSize } from '../../../../../contexts/ScreenSizeContext'
import { Link } from 'react-router-dom'
import { withScreenSize } from '../../../../../contexts/ScreenSizeContext'
import { getExcerpt } from '../../../../../bcorpPost'
import { createCPTUrl } from '../../../../../bcorpUrl'
import ImageFrame from '../../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import PostMetaData from '../../../../../components/PostMetaData/PostMetaData'
import PostTags from '../../../../../components/PostTags/PostTags'
import ContentTransformer from '../../../../../components/ContentTransformer/ContentTransformer'
import style from './PostRemaining.scss'

type Props = {
  post: BCorpPost,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

class PostRemaining extends Component<Props> {
  renderTitle () {
    if (!this.props.post.post.post_title) {
      return
    }

    return (
      <Link to={createCPTUrl(this.props.post.post) || '#'}>
        <h5 className={style.title}>{this.props.post.post.post_title}</h5>
      </Link>
    )
  }

  renderPostMeta () {
    return (
      <PostMetaData
        className={style.meta}
        authorName={this.props.post.post.author_display_name}
        date={this.props.post.post.post_date}
        format={1}
      />
    )
  }

  renderImage () {
    const featuredImage = this.props.post.media['featured_image']

    if (featuredImage === '') {
      return
    }

    return (
      <Link to={createCPTUrl(this.props.post.post) || '#'}>
        <div className={style.image}>
          <ImageFrame
            src={featuredImage[0]}
            aspectRatio={0.99}
            aspectRatioTablet={170 / 186}
            aspectRatioDesktop={170 / 186}
          />
        </div>
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
      <div className={style.content}>
        <ContentTransformer content={excerpt} />
      </div>
    )
  }

  renderTags () {
    if (
      !this.props.post.terms.post_tag ||
      !this.props.post.terms.post_tag.length
    ) {
      return
    }

    return (
      <PostTags
        tags={this.props.post.terms.post_tag}
        className={style.postTags}
      />
    )
  }

  render () {
    return this.props.screenSize === 'mobile' ? (
      <div className={`col1 ${style.postRemaining}`}>
        <div className={'row'}>
          <div className={`col4 ${style.imageContainer}`}>
            {this.renderImage()}
          </div>
          <div className={`col4x3 ${style.titleContainer}`}>
            {this.renderTitle()}
            {this.renderPostMeta()}
          </div>
          <div className={`col1`}>
            {this.renderContent()}
            {this.renderTags()}
          </div>
        </div>
      </div>
    ) : (
      <div className={`col1 ${style.postRemaining}`}>
        <div className={'row'}>
          <div className={`col4 ${style.imageContainer}`}>
            {this.renderImage()}
          </div>
          <div className={`col4x3 ${style.contentContainer}`}>
            {this.renderTitle()}
            {this.renderPostMeta()}
            {this.renderContent()}
            {this.renderTags()}
          </div>
        </div>
      </div>
    )
  }
}

export default withScreenSize(PostRemaining)
