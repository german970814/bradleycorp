// @flow
import * as React from 'react'
import type { WPPost } from '../../types/post_types'
import LeaveACommentForm from './LeaveACommentForm/LeaveACommentForm'
import style from './PostComments.scss'

type NewComment = {
  comment?: string,
  name?: string,
  email?: string
}

type Props = {
  post: WPPost
}

type State = {
  newComment?: NewComment
}

class PostComments extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {}
  }

  updateNewComment (newComment: NewComment): void {
    this.setState({ newComment })
  }

  handleSubmitNewComment (newComment: NewComment): void {
    console.log(newComment)
  }

  render () {
    return (
      <div className={style.PostCommentsForm}>
        <LeaveACommentForm
          newComment={this.state.newComment || {}}
          updateNewComment={this.updateNewComment.bind(this)}
          onSubmit={this.handleSubmitNewComment.bind(this)}
        />
      </div>
    )
  }
}

export default PostComments
export type { NewComment }
