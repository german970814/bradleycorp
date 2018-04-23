// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Options = {
  [string]: ?string
}

type Props = {
  filterState?: Array<string>,
  handleChange: (newCheckboxArray: Array<string>) => void,
  options?: Options,
  title?: string,
  className?: string,
  checkboxOptionClassName?: string,
  showOtherField?: boolean
}

class BCorpCheckboxField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>): void {
    let newCheckedState =
      this.props.filterState && this.props.filterState.length
        ? [...this.props.filterState]
        : []

    const index = newCheckedState.findIndex(alreadyChecked => {
      return alreadyChecked === event.target.value
    })

    if (index !== -1) {
      newCheckedState.splice(index, 1)
    } else {
      newCheckedState = [...newCheckedState, event.target.value]
    }

    return this.props.handleChange(newCheckedState)
  }

  renderOptions () {
    return this.props.options
      ? Object.keys(this.props.options).map((optionName, index) => {
        const label =
            this.props.options && this.props.options[optionName]
              ? this.props.options[optionName]
              : ''

        return (
          <div
            key={index}
            className={`checkbox-option ${this.props
              .checkboxOptionClassName || ''} ${style.checkboxOption}`}>
            <div className={style.checkboxBox}>
              <div className={style.checkboxBoxInner} />
            </div>
            <input
              onChange={this.handleChange.bind(this)}
              type="checkbox"
              value={optionName}
            />
            <label htmlFor={optionName}>{label}</label>
          </div>
        )
      })
      : null
  }

  render () {
    return (
      <div className={`${style.checkbox} ${this.props.className || ''}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        {this.renderOptions()}
      </div>
    )
  }
}

export default BCorpCheckboxField
