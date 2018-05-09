// @flow
import * as React from 'react'
import type { FiltersType } from '../NewsTemplate'
import BCorpSearchField from '../../../../../components/BCorpFilterField/BCorpSearchField'
import BCorpSelectField from '../../../../../components/BCorpFilterField/BCorpSelectField'
import style from './Filters.scss'

type Props = {
  title: string,
  filters: FiltersType,
  updateFilters: (filters: FiltersType) => void,
  yearOptions: {
    [number | string]: ?string
  }
}

class Filters extends React.Component<Props> {
  updateYearFilter (event: SyntheticInputEvent<HTMLSelectElement>) {
    const filters = { ...this.props.filters }
    filters.year = parseInt(event.target.value)

    return this.props.updateFilters(filters)
  }

  updateSearchFilter (searchQuery: string) {
    const filters = { ...this.props.filters }
    filters.search = searchQuery

    return this.props.updateFilters(filters)
  }

  renderYear () {
    return (
      <div className={`col4 col2-desktop ${style.yearWrapper}`}>
        <BCorpSelectField
          defaultOptionId={0}
          defaultOptionName={'All'}
          options={this.props.yearOptions}
          filterState={this.props.filters.year}
          handleChange={this.updateYearFilter.bind(this)}
          className={style.year}
        />
      </div>
    )
  }

  renderSearch () {
    return (
      <div className={`col4x3 col2-desktop ${style.searchWrapper}`}>
        <BCorpSearchField
          filterState={this.props.filters.search}
          handleSubmit={this.updateSearchFilter.bind(this)}
          className={style.search}
          placeholder={`Search ${this.props.title}`}
        />
      </div>
    )
  }

  render () {
    return (
      <div className={`row ${style.filters}`}>
        {this.renderSearch()}
        {this.renderYear()}
      </div>
    )
  }
}

export default Filters
