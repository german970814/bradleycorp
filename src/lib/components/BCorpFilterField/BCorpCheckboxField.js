// @flow
import * as React from 'react'
import BCorpInputField from './BCorpInputField'
import style from './BCorpFilterField.scss'

/**
 * A utility component for easily creating a group of checkboxes
 * with the default Bradley style.
 *
 * The component has the option to inlude an 'other' field.
 * When the 'other' box is ticked, a text input field will be unlocked
 */

/**
 * The options should be passed to the checkbox field as an object with this shape
 */
type Options = {
  // some unique id: display string
  [string]: ?string
}

/**
 * We just keep a record of the selected fields' ids in an array.
 */
type CheckboxesType = Array<string>

/**
 * The shape that the state higher up the tree where the checkbox state is stored should have.
 */
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
   * We expect the state is being managed somewhere higher up the component tree.
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
  /**
   * To sit above the checkbox field
   */
  title?: string,
  className?: string,
  checkboxOptionClassName?: string,
  /**
   * If true, an 'other' field will be included at the bottom
   * with an input field for inputting another option.
   */
  showOtherField?: boolean,
  otherCheckboxClassName?: string,
  /**
   * Also turn the checkbox label black when it is checked
   */
  labelTurnsBlackWhenChecked?: boolean
}

class BCorpCheckboxField extends React.Component<Props> {
  /**
   * Update our CheckboxObject with the new selection/unselection
   * and send it to the handleChange function we got as props.
   */
  handleChange (event: SyntheticInputEvent<HTMLInputElement>): void {
    let newCheckedState =
      this.props.filterState &&
      this.props.filterState.checkboxes &&
      this.props.filterState.checkboxes.length
        ? [...this.props.filterState.checkboxes]
        : []

    // was it already checked?
    const index = newCheckedState.findIndex(alreadyChecked => {
      return alreadyChecked === event.target.value
    })

    if (index !== -1) {
      // box already checked, so the change must be to uncheck it,
      // remove its' id from our array
      newCheckedState.splice(index, 1)
    } else {
      // not checked, so add the id to the array
      newCheckedState = [...newCheckedState, event.target.value]
    }

    // being careful not to mutate props,
    // pass the new object to the higher level state
    const newCheckboxObj = { ...this.props.filterState } || {}
    newCheckboxObj.checkboxes = newCheckedState

    return this.props.handleChange(newCheckboxObj)
  }

  /**
   * This function specifically handles an event on the 'other' checkbox
   * which unlocks the text input field
   */
  handleOtherCheckboxChange (
    event: SyntheticInputEvent<HTMLInputElement>
  ): void {
    const newCheckboxObj = { ...this.props.filterState } || {}
    newCheckboxObj.other = newCheckboxObj.other || {}
    newCheckboxObj.other.checked = !newCheckboxObj.other.checked
    return this.props.handleChange(newCheckboxObj)
  }

  /**
   * This function handles an event within the 'other' text input field
   */
  handleOtherInputChange (event: SyntheticInputEvent<HTMLInputElement>): void {
    const newCheckboxObj = { ...this.props.filterState } || {}
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

    // the style will change to indicate the other field is unlocked
    const inputLocked =
      this.props.filterState &&
      this.props.filterState.other &&
      this.props.filterState.other.checked
        ? { disabled: false, style: '' }
        : { disabled: true, style: style.fill }

    // it needs a hash so it doesnt clash with any other similar fields on the page
    const id = `checked_${this.createHash()}`

    return this.props.showOtherField ? (
      <div
        className={`col1 ${this.props.otherCheckboxClassName || ''} ${
          style.other
        }`}>
        <div className={`other-checkbox-option ${style.checkboxOption}`}>
          <input
            id={id}
            onChange={this.handleOtherCheckboxChange.bind(this)}
            type="checkbox"
            value={'checked'}
          />
          <label htmlFor={id}>{'Other (please specify)'}</label>
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

  /**
   * Loop through our options object creating a checkbox for each
   * with an id including a unique hash to avoid clashes.
   */
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

      // each option needs a hash
      // so it doesnt clash with any other similar fields on the page
      const id = `${optionName}_${this.createHash()}`

      // Note we have to explicitly set checked to false if checked is false,
      // even though we know checked will be a boolean.
      //
      // Technically it could be undefined, or null, so to make sure the React component
      // becomes 'controlled' we need to make sure it will always have a valid vaue
      //
      // @see https://reactjs.org/docs/forms.html#controlled-components or README
      return (
        <div
          key={index}
          className={`checkbox-option ${this.props.checkboxOptionClassName ||
            ''} ${style.checkboxOption}`}>
          <div>
            <input
              onChange={this.handleChange.bind(this)}
              type="checkbox"
              value={optionName}
              id={id}
              checked={checked || false}
            />
          </div>
          <div>
            <label
              htmlFor={id}
              dangerouslySetInnerHTML={{ __html: label }}
              className={
                this.props.labelTurnsBlackWhenChecked && checked
                  ? style.labelChecked
                  : ''
              }
            />
          </div>
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

  /**
   * Creates a random hash of 7 characters,
   * will be sufficient to make sure ids are unique
   */
  createHash () {
    return Math.random()
      .toString(36)
      .substring(7)
  }
}

export default BCorpCheckboxField
export type { CheckboxObject, CheckboxesType }
