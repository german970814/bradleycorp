// @flow
import * as React from 'react'
import type { NewComment } from '../PostComments'
import BCorpTextareaField from '../../../components/BCorpFilterField/BCorpTextareaField'
import BCorpInputField from '../../../components/BCorpFilterField/BCorpInputField'
import style from './LeaveACommentForm.scss'

type Props = {
  newComment: NewComment,
  updateNewComment: (newComment: NewComment) => void
}

class LeaveACommentForm extends React.Component<Props> {
  handleNewCommentFieldChange (
    event: SyntheticInputEvent<HTMLInputElement>,
    fieldName: 'comment' | 'name' | 'email'
  ) {
    const newComment = { ...this.props.newComment }
    newComment[fieldName] = event.target.value
    return this.props.updateNewComment(newComment)
  }

  render () {
    return (
      <form className={`row`}>
        <h5 className={style.title}>{'Leave a Comment'}</h5>
        <div className={style.disclaimer}>
          {'Your email address will not be published.'}
        </div>
        <BCorpTextareaField
          className={`col1 ${style.comment}`}
          filterState={this.props.newComment.comment}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'comment')
          }}
          placeholder={'Comment Here'}
          width={'100%'}
        />
        <BCorpInputField
          className={`col1 col2-tablet ${style.name}`}
          filterState={this.props.newComment.name}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'name')
          }}
          placeholder={'Name'}
        />
        <BCorpInputField
          className={`col1 col2-tablet ${style.email}`}
          filterState={this.props.newComment.email}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'email')
          }}
          placeholder={'Email'}
        />
        <button className={style.button} type={'submit'}>
          {'SUBMIT'}
        </button>
      </form>
    )
  }
}

export default LeaveACommentForm
