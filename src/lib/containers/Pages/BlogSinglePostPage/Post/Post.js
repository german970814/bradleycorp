// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../types/post_types'
import ContentTransformer from '../../../../components/ContentTransformer/ContentTransformer'
import ImageFrame from '../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import PostMetaData from '../../../../components/PostMetaData/PostMetaData'
import PostTags from '../../../../components/PostTags/PostTags'
import style from './Post.scss'

/**
 * Defines layout and styling of the post part
 * of a single blog post page
 */

type Props = { post: BCorpPost }

class Post extends React.Component<Props> {
  renderTitle () {
    if (!this.props.post.post.post_title) {
      return
    }

    return <h2 className={style.title}>{this.props.post.post.post_title}</h2>
  }

  renderPostMeta () {
    const { post } = this.props.post
    return (
      <PostMetaData
        authorName={post.author_display_name}
        date={post.post_date}
        format={1}
      />
    )
  }

  renderImage () {
    if (!this.props.post.media.featured_image) {
      return
    }

    return (
      <div className={style.image}>
        <ImageFrame
          src={this.props.post.media.featured_image[0]}
          aspectRatio={158 / 270}
          aspectRatioTablet={271 / 331}
          aspectRatioDesktop={299 / 371}
        />
      </div>
    )
  }

  renderContent () {
    if (!this.props.post.post.post_content) {
      return
    }

    return (
      <div className={style.content}>
        {this.renderImage()}
        <ContentTransformer content={this.props.post.post.post_content || ''} />
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
      <PostTags tags={this.props.post.terms.post_tag} className={style.tags} />
    )
  }

  render () {
    return (
      <div className={`row ${style.post}`}>
        {this.renderTitle()}
        {this.renderPostMeta()}
        {this.renderContent()}
        {this.renderTags()}
      </div>
    )
  }
}

export default Post
