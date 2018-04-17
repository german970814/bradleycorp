// @flow
import * as React from 'react'
import NumericInput from 'react-numeric-input'
import style from './BCorpFilterField.scss'

type Props = {
  filterState: number,
  handleChange: (newNumber: number) => void,
  title?: string,
  className?: string,
  min?: number,
  max?: number
}

/**
 * Class responsible for displaying and updating the number filter
 */
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
