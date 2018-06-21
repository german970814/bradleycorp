// @flow
import * as React from 'react'
import type { ChipSamplePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes, MaterialTypes } from '../LiteratureAndChipSamples'
import { materialTypeFilterDefault } from '../LiteratureAndChipSamples'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import style from './Filters.scss'

type Props = {
  chipSamples?: Array<ChipSamplePost>,
  materialTypes: MaterialTypes,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the materialType filter
 */
class MaterialTypeSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.props.updateFilters({
      ...this.props.filters,
      chipSamples: {
        ...this.props.filters.chipSamples,
        materialType: parseInt(event.target.value)
      }
    })
  }

  render () {
    return (
      <BCorpSelectField
        defaultOptionId={materialTypeFilterDefault}
        defaultOptionName={'Material Type'}
        options={this.props.materialTypes}
        filterState={this.props.filters.chipSamples.materialType}
        handleChange={this.handleChange.bind(this)}
        title={'Material Type'}
        className={`col4x3 col3-tablet ${style.materialType}`}
        sortAlphabetically
      />
    )
  }
}

export default MaterialTypeSelect
