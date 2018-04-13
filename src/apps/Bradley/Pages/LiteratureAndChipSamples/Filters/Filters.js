// @flow
import * as React from 'react'
import type {
  OptionsTypes,
  FiltersTypes,
  PostTypeOptions
} from '../LiteratureAndChipSamples'
import ProductLineSelect from './ProductLineSelect'
import LanguageSelect from './LanguageSelect'
import LiteratureSearch from './LiteratureSearch'
import MaterialTypeSelect from './MaterialTypeSelect'
import style from './Filters.scss'

type Props = {
  options: OptionsTypes,
  filters: FiltersTypes,
  selected: PostTypeOptions,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the filters
 */
class Filters extends React.Component<Props> {
  renderFiltersLiterature () {
    return (
      <React.Fragment>
        <ProductLineSelect
          literature={this.props.options.literature}
          filters={this.props.filters}
          updateFilters={this.props.updateFilters}
        />
        <LanguageSelect
          literature={this.props.options.literature}
          filters={this.props.filters}
          updateFilters={this.props.updateFilters}
        />
        <LiteratureSearch
          filters={this.props.filters}
          updateFilters={this.props.updateFilters}
        />
      </React.Fragment>
    )
  }

  renderFiltersChipSamples () {
    return (
      <MaterialTypeSelect
        chipSamples={this.props.options.chipSamples}
        filters={this.props.filters}
        updateFilters={this.props.updateFilters}
      />
    )
  }

  render () {
    return (
      <div className={`row ${style.filters}`}>
        {this.props.selected === 'literature'
          ? this.renderFiltersLiterature()
          : this.renderFiltersChipSamples()}
      </div>
    )
  }
}

export default Filters
