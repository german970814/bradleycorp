// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

/**
 * A utility component for creating a textarea field
 * with the default Bradley style.
 *
 * Very similar to the BCorpInputField, but obviously renders a textarea instead.
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
   * Disable the field (adds HTML 'disabled' attribute)
   */
  disabled?: boolean,
  /**
   * Can set the width and height inline
   */
  width?: string,
  height?: string,
  /**
   * Below props are just passed directly through to textarea tag
   */
  cols?: number,
  rows?: number,
  maxlength?: number
}

class BCorpTextareaField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.handleChange(event)
  }

  render () {
    return (
      <div className={`${this.props.className || ''} ${style.input}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <textarea
          style={{
            width: this.props.width,
            height: this.props.height
          }}
          cols={this.props.cols}
          rows={this.props.rows}
          maxLength={this.props.maxlength}
          value={this.props.filterState || ''}
          onChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder || ''}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

export default BCorpTextareaField
