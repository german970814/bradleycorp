// @flow
import * as React from 'react'
import BCorpInputField from './BCorpInputField'
import style from './BCorpFilterField.scss'

type Options = {
  [string]: ?string
}

// we just keep a record of the selected fields id or slug
type CheckboxesType = Array<string>

type CheckboxObject = {
  checkboxes?: CheckboxesType,
  other?: {
    checked?: boolean,
    content?: string
  }
}

type Props = {
  /**
   * Current state, takes CheckboxObject type.
   * We expect the state is being managed somewhre higher up the component tree.
   */
  filterState?: CheckboxObject,
  /**
   * A function to update the state higher up the tree.
   * Should take a CheckboxObject type as an arg.
   */
  handleChange: (newCheckboxObj: CheckboxObject) => void,
  /**
   * The checkbox options.
   * Should be an object with string: string pair attributes.
   * First string is value, second is label.
   */
  options: Options,
  title?: string,
  className?: string,
  checkboxOptionClassName?: string,
  /**
   * If true, an 'other' field will be included at the bottom
   * with an input field for inputting another option.
   */
  showOtherField?: boolean,
  otherCheckboxClassName?: string
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

    const inputLocked =
      this.props.filterState &&
      this.props.filterState.other &&
      this.props.filterState.other.checked
        ? { disabled: false, style: '' }
        : { disabled: true, style: style.fill }

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
          className={`${inputLocked.style}`}
          filterState={inputState}
          handleChange={this.handleOtherInputChange.bind(this)}
          disabled={inputLocked.disabled}
        />
      </div>
    ) : null
  }

  renderOptions () {
    return Object.keys(this.props.options).map((optionName, index) => {
      const checked =
        this.props.filterState &&
        this.props.filterState.checkboxes &&
        this.props.filterState.checkboxes.length &&
        this.props.filterState.checkboxes.includes(optionName)

      const label =
        this.props.options && this.props.options[optionName]
          ? this.props.options[optionName]
          : ''

      return (
        <div
          key={index}
          className={`checkbox-option ${this.props.checkboxOptionClassName ||
            ''} ${style.checkboxOption}`}>
          <input
            onChange={this.handleChange.bind(this)}
            type="checkbox"
            value={optionName}
            id={optionName}
            checked={checked || false}
          />
          <label htmlFor={optionName}>{label}</label>
        </div>
      )
    })
  }

  renderCheckBoxes () {
    return (
      <div className={`${style.checkbox} ${this.props.className || ''}`}>
        {this.props.title ? (
          <h5 className={`checkbox-title ${style.checkBoxTitle}`}>
            {this.props.title}
          </h5>
        ) : null}
        {this.renderOptions()}
        {this.renderOtherField()}
      </div>
    )
  }

  render () {
    return this.renderCheckBoxes()
  }
}

export default BCorpCheckboxField
export type { CheckboxObject, CheckboxesType }
