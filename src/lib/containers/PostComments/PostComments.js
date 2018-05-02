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

  render () {
    return (
      <div className={style.PostCommentsForm}>
        <LeaveACommentForm
          newComment={this.state.newComment || {}}
          updateNewComment={this.updateNewComment}
        />
      </div>
    )
  }
}

export default PostComments
export type { NewComment }
