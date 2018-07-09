// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

/**
 * A utility component for creating an input field with the default Bradley style.
 */

type Props = {
  /**
   * The input field state, to be stored somewhere higher up the tree
   */
  filterState?: string,
  /**
   * A function to update the state further up the tree when we get an input event
   */
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  title?: string,
  placeholder?: string,
  className?: string,
  /**
   * Disable the input field (adds HTML 'disabled' attribute)
   */
  disabled?: boolean,
  /**
   * Add a red star to the field to indicate that it's requried
   */
  required?: boolean,
  /**
   * Add the word 'required' to the red required star
   */
  lengthenRequired?: boolean
}

class BCorpInputField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.handleChange(event)
  }

  /**
   * Note the 'required' styles are set in the scss as pseudo elements
   */
  render () {
    const requiredClassName =
      this.props.required &&
      (!this.props.filterState || this.props.filterState === '')
        ? style.required
        : ''

    const lengthenRequired: string = this.props.lengthenRequired
      ? style.lengthen
      : ''

    return (
      <div
        className={`${this.props.className || ''} ${
          style.input
        } ${requiredClassName} ${lengthenRequired}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <input
          value={this.props.filterState || ''}
          onChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder || ''}
          type={'text'}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

export default BCorpInputField
