// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

/**
 * A utility component for creating an input field
 * with the default Bradley Search field styling
 * (with the magnifying glass at the end).
 *
 * Aside from the styling, the main difference between this and the Input Field
 * is that it's designed to update the state only on submit,
 * not on every input event.
 */

type Props = {
  /**
   * Takes the search string as it is when the field is submitted.
   */
  handleSubmit: string => void,
  /**
   * Appears above the field
   */
  title?: string,
  className?: string,
  placeholder?: string,
  /**
   * We can give the search field an initial value
   * rather than just a placeholder which will disappear when we type.
   */
  initValue?: string,
  magnifyingGlassColor?: 'white' | 'grey'
}

type State = {
  /**
   * The Search Field is still a controlled component.
   *
   * We manage the state temporarily here then pass it up the tree via the
   * handleSubmit function when the user submits.
   */
  value?: string
}

class BCorpSearchField extends React.Component<Props, State> {
  /**
   * Store a ref to the form node so we can easily dispatch submit events
   * @type {[type]}
   */
  form: ?HTMLFormElement

  constructor (props: Props) {
    super(props)

    this.state = { value: this.props.initValue || '' }
  }

  /**
   * Not to be confused with handleSubmit passed as props.
   *
   * Here we stop the page from reloading on submit
   * and pass the current input state up the tree.
   */
  handleSubmit (event: SyntheticInputEvent<HTMLFormElement>) {
    // stops the page from reloading
    event.preventDefault()

    if (this.state.value || this.state.value === '') {
      this.props.handleSubmit(this.state.value || '')
    }
  }

  /**
   * Adds submit functionality to the search icon
   *
   * Simply calling this.form.submit()
   * won't dispatch the submit event automatically, and the page will reload.
   * We need to manually dispatch the submit event.
   */
  handleSearchIconClick () {
    if (this.form) {
      this.form.dispatchEvent(new Event('submit'))
    }
  }

  /**
   * Handles a change to the input field, since this is a controlled component,
   * we store the input state locally.
   */
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <div className={`${this.props.className || ''} ${style.search}`}>
        <form
          ref={node => (this.form = node)}
          onSubmit={this.handleSubmit.bind(this)}>
          {this.props.title ? (
            <h5 className={style.title}>{this.props.title}</h5>
          ) : null}
          <input
            value={this.state.value || ''}
            onChange={this.handleChange.bind(this)}
            type={'text'}
            placeholder={this.props.placeholder || ''}
          />
          <div
            className={`bcorp-search-field-icon-container ${
              style.iconContainer
            }`}
            onClick={this.handleSearchIconClick.bind(this)}>
            {this.props.magnifyingGlassColor &&
            this.props.magnifyingGlassColor === 'grey' ? (
                <img
                  src={require('../../../images/magnifying-glass/magnifying-glass@2x.png')}
                />
              ) : (
                <img
                  src={require('../../../images/magnifying-glass/magnifying-glass-white@2x.png')}
                />
              )}
          </div>
        </form>
      </div>
    )
  }
}

export default BCorpSearchField
