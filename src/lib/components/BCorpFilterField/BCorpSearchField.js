// @flow
import * as React from 'react'
import style from './BCorpFilterField.scss'

type Props = {
  filterState?: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  title?: string,
  className?: string
}

/**
 * Class responsible for displaying and updating the search filter
 */
class BCorpSearchField extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    this.props.handleChange(event)
  }

  render () {
    return (
      <div className={`${this.props.className || ''} ${style.search}`}>
        {this.props.title ? (
          <h5 className={style.title}>{this.props.title}</h5>
        ) : null}
        <input
          value={this.props.filterState}
          onChange={this.handleChange.bind(this)}
          type={'text'}
        />
        <div className={style.iconContainer}>
          <img
            src={require('../../../images/magnifying-glass/magnifying-glass-white@2x.png')}
          />
        </div>
      </div>
    )
  }
}

export default BCorpSearchField
