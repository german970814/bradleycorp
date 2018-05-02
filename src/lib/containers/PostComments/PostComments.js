// @flow
import * as React from 'react'
import type { WPCreateComment, WPComment } from '../../types/comment_types'
import type { WPPost } from '../../types/post_types'
import LeaveACommentForm from './LeaveACommentForm/LeaveACommentForm'
import WPAPIClient from '../../../api/wp_client'
import Comment from './Comment/Comment'
import style from './PostComments.scss'

type NewComment = {
  comment?: string,
  name?: string,
  email?: string
}

type Props = {
  post: WPPost,
  postSlug: string
}

type State = {
  newComment?: NewComment,
  comments?: Array<WPComment>
}

class PostComments extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    this.getComments(this.props)
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.postSlug !== this.props.postSlug) {
      this.getComments(newProps)
    }
  }

  updateNewComment (newComment: NewComment): void {
    this.setState({ newComment })
  }

  handleSubmitNewComment (newComment: NewComment): void {
    console.log(newComment)
    this.submitComment(newComment)
  }

  renderComments () {
    if (!this.state.comments || !this.state.comments.length) {
      return
    }

    return this.state.comments.map((comment, index) => {
      return <Comment key={index} comment={comment} />
    })
  }

  render () {
    return (
      <div className={style.PostCommentsForm}>
        <LeaveACommentForm
          newComment={this.state.newComment || {}}
          updateNewComment={this.updateNewComment.bind(this)}
          onSubmit={this.handleSubmitNewComment.bind(this)}
        />
        {this.renderComments()}
      </div>
    )
  }

  async submitComment (newComment: NewComment) {
    try {
      if (!newComment.email || !newComment.name || !newComment.comment) {
        return
      }

      const date = new Date()
      const comment: WPCreateComment = {
        // author?: number,
        author_email: newComment.email,
        author_name: newComment.name,
        content: newComment.comment,
        date: date.toDateString(),
        post: this.props.post.ID
      }
      console.log(comment)
      const response = await WPAPIClient.postNewComment(comment)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  async getComments (props: Props) {
    try {
      const response = await WPAPIClient.getComments(props.post.ID)
      const comments = response.data

      this.setState({ comments })
    } catch (err) {
      console.log(err)
    }
  }
}

export default PostComments
export type { NewComment }
