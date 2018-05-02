// @flow
import * as React from 'react'
import type { NewComment } from '../PostComments'
import BCorpTextareaField from '../../../components/BCorpFilterField/BCorpTextareaField'
import BCorpInputField from '../../../components/BCorpFilterField/BCorpInputField'
import style from './LeaveACommentForm.scss'

type Props = {
  newComment: NewComment,
  updateNewComment: (newComment: NewComment) => void,
  onSubmit: (newComment: NewComment) => void
}

type State = {
  highlightEmptyFields: boolean
}

class LeaveACommentForm extends React.Component<Props, State> {
  requiredFields: Array<string>

  constructor (props: Props) {
    super(props)

    this.state = { highlightEmptyFields: false }

    this.requiredFields = ['comment', 'name', 'email']
  }

  handleNewCommentFieldChange (
    event: SyntheticInputEvent<HTMLInputElement>,
    fieldName: 'comment' | 'name' | 'email'
  ): void {
    const newComment = { ...this.props.newComment }
    newComment[fieldName] = event.target.value
    return this.props.updateNewComment(newComment)
  }

  handleSubmit (event: SyntheticInputEvent<HTMLFormElement>): void {
    event.preventDefault()

    if (this.fieldsPassValidation()) {
      this.props.onSubmit(this.props.newComment)
    } else {
      this.setState({ highlightEmptyFields: true })
    }
  }

  render () {
    const hightlightEmptyComment =
      this.state.highlightEmptyFields && !this.props.newComment.comment
        ? style.highlight
        : ''

    const hightlightEmptyName =
      this.state.highlightEmptyFields && !this.props.newComment.name
        ? style.highlight
        : ''

    const hightlightEmptyEmail =
      this.state.highlightEmptyFields && !this.props.newComment.email
        ? style.highlight
        : ''

    return (
      <form
        className={`row ${style.LeaveACommentForm}`}
        onSubmit={this.handleSubmit.bind(this)}>
        <h5 className={style.title}>{'Leave a Comment'}</h5>
        <div className={style.disclaimer}>
          {'Your email address will not be published.'}
        </div>
        <BCorpTextareaField
          className={`col1 ${style.input} ${
            style.comment
          } ${hightlightEmptyComment}`}
          filterState={this.props.newComment.comment}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'comment')
          }}
          placeholder={'Comment Here'}
          width={'100%'}
          required={this.requiredFields.includes('comment')}
        />
        <BCorpInputField
          className={`col1 col2-tablet ${style.input} ${
            style.name
          } ${hightlightEmptyName}`}
          filterState={this.props.newComment.name}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'name')
          }}
          placeholder={'Name'}
          required={this.requiredFields.includes('name')}
        />
        <BCorpInputField
          className={`col1 col2-tablet ${style.input} ${
            style.email
          } ${hightlightEmptyEmail}`}
          filterState={this.props.newComment.email}
          handleChange={event => {
            this.handleNewCommentFieldChange(event, 'email')
          }}
          placeholder={'Email'}
          required={this.requiredFields.includes('email')}
        />
        <button className={style.button} type={'submit'}>
          {'SUBMIT'}
        </button>
      </form>
    )
  }

  fieldsPassValidation (): boolean {
    return this.requiredFields.every(field => {
      return this.props.newComment[field]
    })
  }
}

export default LeaveACommentForm
