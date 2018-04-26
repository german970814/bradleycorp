// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Props = {
  filterState?: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  title?: string,
  placeholder?: string,
  className?: string,
  disabled?: boolean,
  width?: string,
  height?: string,
  cols?: number,
  rows?: number,
  maxlength?: number
}

/**
 * Class responsible for displaying and updating the input filter
 */
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
          value={this.props.filterState}
          onChange={this.handleChange.bind(this)}
          placeholder={this.props.placeholder || ''}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

export default BCorpTextareaField
