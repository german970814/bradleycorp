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
  handleChange (event: SyntheticInputEvent<HTMLInputElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.search = event.target.value
    this.props.updateFilters(newFilters)
  }

  render () {
    return (
      <BCorpSearchField
        filterState={this.props.filters.literature.search}
        handleChange={this.handleChange.bind(this)}
        title={'Search'}
        className={`col1 col2-tablet`}
      />
    )
  }
}

export default LiteratureSearch
