// @flow
import * as React from 'react'
import type { ChipSamplePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import style from './Filters.scss'

type MaterialTypes = {
  [number | string]: ?string
}

type Props = {
  chipSamples?: Array<ChipSamplePost>,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the materialType filter
 */
class MaterialTypeSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.chipSamples.materialType = event.target.value
    this.props.updateFilters(newFilters)
  }

  render () {
    const materialTypes: MaterialTypes = this.getMaterialTypes()

    return (
      <BCorpSelectField
        defaultOptionId={'0'}
        defaultOptionName={'Material Type'}
        options={materialTypes}
        filterState={this.props.filters.chipSamples.materialType}
        handleChange={this.handleChange.bind(this)}
        title={'Material Type'}
        className={`col4x3 col3-tablet ${style.materialType}`}
      />
    )
  }

  getMaterialTypes (): MaterialTypes {
    const materialTypes = {}

    if (!this.props.chipSamples) {
      return materialTypes
    }

    this.props.chipSamples.forEach(chipSamples => {
      if (
        !chipSamples.terms.material_type ||
        !chipSamples.terms.material_type.length
      ) {
        return
      }

      chipSamples.terms.material_type.forEach(materialType => {
        if (!Object.keys(materialTypes).includes(materialType.term_id)) {
          materialTypes[materialType.term_id] = materialType.name
        }
      })
    })

    return materialTypes
  }
}

export default MaterialTypeSelect
