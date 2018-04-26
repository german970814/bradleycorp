// @flow
import * as React from 'react'
import type { FiltersType } from '../VideoGallery'
import { videoTypeDefault, productTypeDefault } from '../VideoGallery'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import BCorpSearchField from '../../../../../lib/components/BCorpFilterField/BCorpSearchField'
import style from './Filters.scss'

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

  handleProductTypeChange (event: SyntheticInputEvent<HTMLSelectElement>): void {
    const newFilters = this.props.filters
    newFilters.video_gallery_product_tag = event.target.value
    return this.props.updateFilters(newFilters)
  }

  handleSearchSubmit (search: string): void {
    const newFilters = this.props.filters
    newFilters.search = search
    return this.props.updateFilters(newFilters)
  }

  render () {
    return (
      <div className={`row ${style.filters}`}>
        <div className={`col2 col4-tablet ${style.videoType}`}>
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
        </div>
        <div className={`col2 col4-tablet ${style.productType}`}>
          <BCorpSelectField
            title={'Product Type'}
            defaultOptionId={productTypeDefault}
            defaultOptionName={'All'}
            options={{
              option1: 'Option 1',
              option2: 'Option 2',
              option3: 'Option 3'
            }}
            filterState={this.props.filters.video_gallery_product_tag}
            handleChange={this.handleProductTypeChange.bind(this)}
          />
        </div>
        <div className={`col1 col2-tablet ${style.search}`}>
          <BCorpSearchField
            title={'Search'}
            filterState={this.props.filters.search || ''}
            handleSubmit={this.handleSearchSubmit.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Filters
