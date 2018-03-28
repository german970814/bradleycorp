import React from 'react'
import PropTypes from 'prop-types'
import ArrowButton from '../../../../../../lib/components/ArrowButton/ArrowButton'
import BCorpWidget from '../BCorpWidget'
import style from './NewsletterWidget.scss'

/**
 * The Newsletter Widget
 *
 * @extends BCorpWidget
 */
class NewsletterWidget extends BCorpWidget {
  constructor (props) {
    super(props)

    this.state = {value: ''}
  }

  handleSubmit (e) {
    console.log(`submitted newletter signup form`)
    e.preventDefault()
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  handleClick (e) {
    // simply calling this.form.submit() won't dispatch the submit event automatically, and the page will reload
    this.form.dispatchEvent(new Event('submit'))
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
        placeholder={'Email Address'} />
    )
  }

  renderSubmitButton () {
    const { linkText } = this.props

    return (
      <div
        className={style.button}
        onClick={this.handleClick.bind(this)} >
        <ArrowButton text={linkText} />
      </div>
    )
  }

  renderContentBox () {
    return (
      <React.Fragment>

        {this.renderDescription()}

        <form
          ref={node => { this.form = node }}
          onSubmit={this.handleSubmit.bind(this)} >

          {this.renderInput()}
          {this.renderSubmitButton()}

        </form>

      </React.Fragment>
    )
  }

  render () {
    return super.render()
  }
}

NewsletterWidget.propTypes = {
  ...BCorpWidget.propTypes,

  description: PropTypes.string,
  linkText: PropTypes.string
}

export default NewsletterWidget
