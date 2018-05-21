// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Options = {
  // some id for the option (eg term_id): option name
  [number | string]: ?string
}

type Props = {
  notShowDefault?: boolean,
  defaultOptionId: string | number,
  defaultOptionName: string,
  options?: Options,
  /**
   * We expect that the state is being managed and updated somewhere higher up the tree
   */
  filterState: string | number,
  handleChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  title?: string,
  className?: string,
  required?: boolean
}

/**
 * Class really just holds the styling and structure for a select field of this type
 */
class BCorpSelectField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.props.handleChange(event)
  }

  renderOptions () {
    const { options } = this.props

    if (!options || !Object.keys(options).length) {
      return
    }

    return Object.keys(options).map((optionId, index) => {
      return (
        <option key={index} value={optionId}>
          {options[optionId]}
        </option>
      )
    })
  }

  render () {
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
          {!this.props.notShowDefault && <option value={this.props.defaultOptionId}>
            {this.props.defaultOptionName}
          </option>}
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
