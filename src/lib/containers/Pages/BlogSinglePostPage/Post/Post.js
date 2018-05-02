// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../types/post_types'
import PostMetaData from '../../../../components/PostMetaData/PostMetaData'
import style from './Post.scss'

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

  renderContent () {
    if (!this.props.post.post.post_content) {
      return
    }

    return (
      <div className={style.content}>{this.props.post.post.post_content}</div>
    )
  }

  render () {
    return (
      <div className={`row ${style.post}`}>
        {this.renderTitle()}
        {this.renderPostMeta()}
        {this.renderContent()}
      </div>
    )
  }
}

export default Post
