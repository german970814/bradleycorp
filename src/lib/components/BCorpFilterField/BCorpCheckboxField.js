// @flow
import * as React from 'react'
import BCorpInputField from './BCorpInputField'
import style from './BCorpFilterField.scss'

type Options = {
  [string]: ?string
}

type CheckboxObject = {
  checkboxes?: Array<string>,
  other?: {
    checked?: boolean,
    content?: string
  }
}

type Props = {
  filterState?: CheckboxObject,
  handleChange: (newCheckboxObj: CheckboxObject) => void,
  options?: Options,
  title?: string,
  className?: string,
  checkboxOptionClassName?: string,
  otherCheckboxClassName?: string,
  showOtherField?: boolean
}

class BCorpCheckboxField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>): void {
    let newCheckedState =
      this.props.filterState &&
      this.props.filterState.checkboxes &&
      this.props.filterState.checkboxes.length
        ? [...this.props.filterState.checkboxes]
        : []

    const index = newCheckedState.findIndex(alreadyChecked => {
      return alreadyChecked === event.target.value
    })

    if (index !== -1) {
      newCheckedState.splice(index, 1)
    } else {
      newCheckedState = [...newCheckedState, event.target.value]
    }

    const newCheckboxObj = this.props.filterState || {}
    newCheckboxObj.checkboxes = newCheckedState

    return this.props.handleChange(newCheckboxObj)
  }

  handleOtherCheckboxChange (
    event: SyntheticInputEvent<HTMLInputElement>
  ): void {
    const newCheckboxObj = this.props.filterState || {}
    newCheckboxObj.other = newCheckboxObj.other || {}
    newCheckboxObj.other.checked = !newCheckboxObj.other.checked
    return this.props.handleChange(newCheckboxObj)
  }

  handleOtherInputChange (event: SyntheticInputEvent<HTMLInputElement>): void {
    const newCheckboxObj = this.props.filterState || {}
    newCheckboxObj.other = newCheckboxObj.other || {}
    newCheckboxObj.other.content = event.target.value
    return this.props.handleChange(newCheckboxObj)
  }

  renderOtherField () {
    const inputState =
      this.props.filterState &&
      this.props.filterState.other &&
      this.props.filterState.other.content
        ? this.props.filterState.other.content
        : ''

    const colorState =
      this.props.filterState &&
      this.props.filterState.other &&
      this.props.filterState.other.checked
        ? ''
        : style.fill

    return this.props.showOtherField ? (
      <div
        className={`col1 ${this.props.otherCheckboxClassName || ''} ${
          style.other
        }`}>
        <div className={`other-checkbox-option ${style.checkboxOption}`}>
          <input
            onChange={this.handleOtherCheckboxChange.bind(this)}
            type="checkbox"
            value={'checked'}
          />
          <label htmlFor={'checked'}>{'Other (please specify)'}</label>
        </div>
        <BCorpInputField
          className={`${colorState}`}
          filterState={inputState}
          handleChange={this.handleOtherInputChange.bind(this)}
        />
      </div>
    ) : null
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
          <h5 className={`checkbox-title ${style.title}`}>
            {this.props.title}
          </h5>
        ) : null}
        {this.renderOptions()}
        {this.renderOtherField()}
      </div>
    )
  }
}

export default BCorpCheckboxField
export type { CheckboxObject }
