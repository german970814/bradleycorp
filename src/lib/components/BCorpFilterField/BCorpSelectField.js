// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Options = {
  // some id for the option (eg term_id): option name
  [number | string]: ?string
}

type Props = {
  defaultOptionId: string | number,
  defaultOptionName: string,
  options?: Options,
  /**
   * We expect that the state is being managed and updated somewhere higher up the tree
   */
  filterState: string | number,
  handleChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void,
  title?: string,
  className?: string
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
    return (
      <div className={`${this.props.className || ''} ${style.select}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <select
          value={this.props.filterState}
          onChange={this.handleChange.bind(this)}>
          <option value={this.props.defaultOptionId}>
            {this.props.defaultOptionName}
          </option>
          {this.renderOptions()}
        </select>
      </div>
    )
  }
}

export default BCorpSelectField
