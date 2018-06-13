// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Props = {
  /**
   * Takes the search string as it is when the form is submitted.
   * Should update some kind of higher level state or perform some network request.
   */
  handleSubmit: string => void,
  title?: string,
  className?: string,
  placeholder?: string,
  initValue?: string,
  magnifyingGlassColor?: 'white' | 'grey'
}

type State = {
  value?: string
}

/**
 * Class responsible for displaying and updating the search filter
 */
class BCorpSearchField extends React.Component<Props, State> {
  form: ?HTMLFormElement

  constructor (props: Props) {
    super(props)

    this.state = { value: this.props.initValue || '' }
  }

  handleSubmit (event: SyntheticInputEvent<HTMLFormElement>) {
    event.preventDefault()

    if (this.state.value || this.state.value === '') {
      console.log(this.state.value)
      this.props.handleSubmit(this.state.value || '')
    }
  }

  handleSearchIconClick () {
    // simply calling this.form.submit() won't dispatch the submit event automatically, and the page will reload
    if (this.form) {
      this.form.dispatchEvent(new Event('submit'))
    }
  }

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
