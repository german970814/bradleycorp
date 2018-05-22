// @flow
import * as React from 'react'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import BCorpSearchField from '../../../../../lib/components/BCorpFilterField/BCorpSearchField'

type Props = {
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the search filter
 */
class LiteratureSearch extends React.Component<Props> {
  handleSubmit (searchString: string): void {
    this.props.updateFilters({
      ...this.props.filters,
      literature: {
        ...this.props.filters.literature,
        search: searchString
      }
    })
  }

  render () {
    return (
      <BCorpSearchField
        handleSubmit={this.handleSubmit.bind(this)}
        title={'Search'}
        className={`col1 col2-tablet`}
        placeholder={'Search for Literature'}
        initValue={this.props.filters.literature.search}
      />
    )
  }
}

export default LiteratureSearch
