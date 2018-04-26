// @flow
import * as React from 'react'
import type { FiltersType } from '../VideoGallery'
import { videoTypeDefault, productTypeDefault } from '../VideoGallery'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'

type Props = {
  filters: FiltersType,
  updateFilters: (filters: FiltersType) => void
}

class Filters extends React.Component<Props> {
  handleVideoTypeChange (event: SyntheticInputEvent<HTMLSelectElement>): void {
    const newFilters = this.props.filters
    newFilters.video_gallery_type_cat = event.target.value
    return this.props.updateFilters(newFilters)
  }

  render () {
    return (
      <BCorpSelectField
        title={'Video Type'}
        defaultOptionId={videoTypeDefault}
        defaultOptionName={'All'}
        options={{
          option1: 'Option 1',
          option2: 'Option 2',
          option3: 'Option 3'
        }}
        filterState={this.props.filters.video_gallery_type_cat}
        handleChange={this.handleVideoTypeChange.bind(this)}
      />
    )
  }
}

export default Filters
