// @flow
import React, { Component } from 'react'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'
import BCorpWidget from '../BCorpWidget'
import style from './NewsletterWidget.scss'

type Props = {
  title: string,
  description?: string,
  linkText?: string,
  handleSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void
}

type State = {
  value?: string
}

/**
 * The Newsletter Widget
 */
class NewsletterWidget extends Component<Props, State> {
  form: ?HTMLFormElement

  constructor (props: Props) {
    super(props)

    this.state = { value: '' }
  }

  handleSubmit (event: SyntheticEvent<HTMLFormElement>) {
    if (this.props.handleSubmit) {
      return this.props.handleSubmit(event)
    }
    console.log(`submitted newletter signup form`)
    event.preventDefault()
  }

  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value })
  }

  handleClick (event: SyntheticEvent<HTMLFormElement>) {
    // simply calling this.form.submit() won't dispatch the submit event automatically, and the page will reload
    if (this.form) {
      this.form.dispatchEvent(new Event('submit'))
    }
  }

  renderDescription () {
    const { description } = this.props

    if (!description) {
      return
    }

    return <div className={style.description}>{description}</div>
  }

  renderInput () {
    return (
      <input
        className={`small-body ${style.input}`}
        type={'text'}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        placeholder={'Email Address'}
      />
    )
  }

  renderSubmitButton () {
    const { linkText } = this.props

    return (
      <div className={style.button} onClick={this.handleClick.bind(this)}>
        <ArrowButton text={linkText} />
      </div>
    )
  }

  render () {
    return (
      <BCorpWidget title={this.props.title}>
        {this.renderDescription()}

        <form
          ref={node => {
            this.form = node
          }}
          onSubmit={this.handleSubmit.bind(this)}>
          {this.renderInput()}
          {this.renderSubmitButton()}
        </form>
      </BCorpWidget>
    )
  }
}

export default NewsletterWidget
