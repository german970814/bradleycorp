// @flow
import * as React from 'react'
import NumericInput from 'react-numeric-input'
import style from './BCorpFilterField.scss'

/**
 * A utility component for creating a number input field
 * with the default Bradley style.
 *
 * We've used an external package 'react-numeric-input'
 * to render the actual input field. We were running into a lot of issues with
 * React and number keyboards on some mobile devices,
 * but this seems to solve the problem.
 */

type Props = {
  /**
   * The input field state, to be stored somewhere higher up the tree
   */
  filterState?: string,
  /**
   * A function to update the state further up the tree when we get an input event.
   * We actually just pass the new number here, not the whole event.
   */
  handleChange: (newNumber: number) => void,
  title?: string,
  className?: string,
  min?: number,
  max?: number
}

class BCorpNumberField extends React.Component<Props> {
  handleChange (newNumber: number) {
    this.props.handleChange(newNumber)
  }

  render () {
    return (
      <div className={`${this.props.className || ''} ${style.number}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <NumericInput
          min={this.props.min}
          max={this.props.max}
          value={this.props.filterState}
          className={'bcorp-number'}
          style={false}
          pattern="\d*"
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}

export default BCorpNumberField
