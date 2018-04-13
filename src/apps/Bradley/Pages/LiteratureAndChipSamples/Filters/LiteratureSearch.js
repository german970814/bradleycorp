// @flow
import * as React from 'react'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import style from './Filters.scss'

type Props = {
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the search filter
 */
class LiteratureSearch extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.search = event.target.value
    this.props.updateFilters(newFilters)
  }

  render () {
    return (
      <div className={`col1 col2-tablet ${style.search}`}>
        <h5 className={style.title}>Search</h5>
        <input
          value={this.props.filters.literature.search}
          onChange={this.handleChange.bind(this)}
          type={'text'}
        />
        <div className={style.iconContainer}>
          <img
            src={require('../../../../../images/magnifying-glass/magnifying-glass-white@2x.png')}
          />
        </div>
      </div>
    )
  }
}

export default LiteratureSearch
