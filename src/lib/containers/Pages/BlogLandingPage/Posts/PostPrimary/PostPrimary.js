// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../../types/post_types'
import { Link } from 'react-router-dom'
import { getExcerpt } from '../../../../../bcorpPost'
import { createCPTUrl } from '../../../../../bcorpUrl'
import ImageFrame from '../../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import PostMetaData from '../../../../../components/PostMetaData/PostMetaData'
import PostTags from '../../../../../components/PostTags/PostTags'
import style from './PostPrimary.scss'

type Props = {
  post: BCorpPost
};

class PostPrimary extends Component<Props> {
  renderTitle () {
    if (!this.props.post.post.post_title) {
      return
    }

    return (
      <Link to={createCPTUrl(this.props.post.post) || '#'} replace>
        <h2 className={style.title}>{this.props.post.post.post_title}</h2>
      </Link>
    )
  }

  renderPostMeta () {
    return (
      <PostMetaData
        className={style.meta}
        authorName={this.props.post.post.author_display_name}
        date={this.props.post.post.post_date}
      />
    )
  }

  renderImage () {
    const featuredImage = this.props.post.media['featured_image']

    if (featuredImage === '') {
      return
    }

    return (
      <Link to={createCPTUrl(this.props.post.post) || '#'} replace>
        <div className={style.image}>
          <ImageFrame
            src={featuredImage[0]}
            aspectRatio={214 / 270}
            aspectRatioTablet={263 / 331}
            aspectRatioDesktop={294 / 370}
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
      'long'
    )

    if (!excerpt) {
      return
    }

    return (
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    )
  }

  renderReadMore () {
    return (
      <Link to={createCPTUrl(this.props.post.post) || '#'} replace>
        <button className={style.button}>{'READ MORE'}</button>
      </Link>
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
    return (
      <div className={`col1 ${style.postPrimary}`}>
        {this.renderTitle()}
        {this.renderPostMeta()}
        <div className={'row'}>
          <div className={`col1 col2-tablet ${style.imageContainer}`}>
            {this.renderImage()}
          </div>
          <div className={`col1 col2-tablet ${style.contentContainer}`}>
            {this.renderContent()}
            {this.renderReadMore()}
          </div>
        </div>
        {this.renderTags()}
      </div>
    )
  }
}

export default PostPrimary
