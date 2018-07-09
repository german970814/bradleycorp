// @flow
import * as React from 'react'
import { sortAlphabeticallyArrayOfObjects } from '../../bcorpArray'
import style from './BCorpFilterField.scss'

/**
 * A utility component for creating an select field
 * with the default Bradley styling
 */

/**
 * The select options should be passed as an object with this shape.
 */
type Options = {
  // some id for the option (eg term_id): option name
  [number | string]: ?string
}

type Props = {
  /**
   * Don't include the default option value defined here in props in the options
   */
  notShowDefault?: boolean,
  /**
   * Add an ID for the default option to be added to the top
   * (usually 0 or similar which wont actually refer to a post and is easy to check for)
   */
  defaultOptionId: string | number,
  /**
   * Add a default option name to be added to the top with the default ID
   * (usually something like 'Select...')
   */
  defaultOptionName: string,
  /**
   * The object containing the select field options,
   * see expected shape above
   */
  options?: Options,
  /**
   * We expect that the state is being managed and updated higher up the tree
   */
  filterState: string | number,
  /**
   * Function to update state higher up the tree, receives whole input event
   */
  handleChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  /**
   * Title will appear above the field
   */
  title?: string,
  className?: string,
  /**
   * Add a red star to indicate required
   */
  required?: boolean,
  /**
   * Sort the options alphabetically
   */
  sortAlphabetically?: boolean
}

class BCorpSelectField extends React.Component<Props> {
  /**
   * Call function to pass inout event up the tree
   */
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.props.handleChange(event)
  }

  /**
   * Renders the HTML option tags that will lie between the <select> tags.
   *
   * Note that we unwrap the options object into an array.
   * We could skip this step and render directly from the object keys and values,
   * but the issue is that JS objects are not always traversed by key
   * in the order that they were added.
   *
   * @see http://2ality.com/2015/10/property-traversal-order-es6.html
   * for more info on traversing JS objects.
   *
   * This causes issues and some funny orders when the keys are unknown to us,
   * so if we want to have full control over the order of the object values
   * (what the user actually sees),
   * we need to go via an array (which can be easily ordered)
   */
  renderOptions () {
    const { options } = this.props

    if (!options || !Object.keys(options).length) {
      return
    }

    let optionsArray = Object.keys(options).map(optionId => {
      return {
        id: optionId,
        // had to add this default value even though it shouldnt ever be used
        // we've checked above for empty options object but flow cant seem to recognise it
        value: options[optionId] || '0'
      }
    })

    if (this.props.sortAlphabetically) {
      optionsArray = sortAlphabeticallyArrayOfObjects('value', optionsArray)
    }

    return optionsArray.map((optionObj, index) => {
      return (
        <option key={index} value={optionObj.id}>
          {optionObj.value}
        </option>
      )
    })
  }

  render () {
    // required star style managed in scss as a pseudo element
    const requiredClassName =
      this.props.required &&
      (!this.props.filterState ||
        this.props.filterState === '' ||
        this.props.filterState === 0)
        ? `${style.required} required`
        : ''

    return (
      <div className={`${this.props.className || ''} ${style.select}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <select
          value={this.props.filterState}
          onChange={this.handleChange.bind(this)}>
          {!this.props.notShowDefault && (
            <option value={this.props.defaultOptionId}>
              {this.props.defaultOptionName}
            </option>
          )}
          {this.renderOptions()}
        </select>
        {requiredClassName !== '' ? (
          <div className={requiredClassName} />
        ) : null}
      </div>
    )
  }
}

export default BCorpSelectField
