// @flow
import React, { Component } from 'react'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'
import HubspotForms from '../../../../lib/containers/HubspotForms/HubspotForms'
import BCorpWidget from '../BCorpWidget'
import style from './NewsletterWidget.scss'

type Props = {
  title: string,
  description?: string,
  linkText?: string,
  handleSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void,
  twoColsOnTablet?: boolean,
  form: string,
}

type State = {
  value?: string
};

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
    //
    //
    const formName = this.props.form
    const iframe = ((document.getElementById(formName.replace(/[^\w]/g, '_'))
      :any)
      :HTMLIFrameElement)
    const _window = iframe && iframe.contentWindow
      ? iframe.contentWindow
      : iframe.contentDocument

    if (!_window) {
      console.warn('Could not get iframe window.')
      return
    }

    // console.log( _window )
    // lets post a message to the iframe window
    _window.postMessage({
      action: 'submitForm',
      form: this.props.form
    }, 'http://forms.bradleydev.twoxfour.com')
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
      <BCorpWidget
        title={this.props.title}
        twoColsOnTablet={this.props.twoColsOnTablet}>
        {this.renderDescription()}
        <HubspotForms form={this.props.form} />
        {this.renderSubmitButton()}
        {/* <form
          ref={node => {
            this.form = node
          }}
          onSubmit={this.handleSubmit.bind(this)}>
          {this.renderInput()}
        </form> */}
      </BCorpWidget>
    )
  }
}

export default NewsletterWidget
