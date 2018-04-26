// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Props = {
  filterState?: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  title?: string,
  placeholder?: string,
  className?: string,
  disabled?: boolean
}

/**
 * Class responsible for displaying and updating the input filter
 */
class BCorpInputField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.handleChange(event)
  }

  render () {
    return (
      <div className={`${this.props.className || ''} ${style.input}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <input
          value={this.props.filterState}
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
