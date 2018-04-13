// @flow
import * as React from 'react'
import type { ChipSamplePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import style from './Filters.scss'

type MaterialTypes = {
  [number | string]: string
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

  renderOptions (materialTypes: MaterialTypes) {
    if (
      !this.props.chipSamples ||
      !this.props.chipSamples.length ||
      !Object.keys(materialTypes).length
    ) {
      return
    }

    return Object.keys(materialTypes).map((termId, index) => {
      return (
        <option key={index} value={termId}>
          {materialTypes[termId]}
        </option>
      )
    })
  }

  render () {
    const materialTypes = this.getMaterialTypes()

    return (
      <div
        className={`col4x3 col3-tablet ${style.select} ${style.materialType}`}>
        <h5 className={style.title}>Material Type</h5>
        <select
          value={this.props.filters.chipSamples.materialType}
          onChange={this.handleChange.bind(this)}>
          <option value="materialType">Material Type</option>
          {this.renderOptions(materialTypes)}
        </select>
      </div>
    )
  }

  getMaterialTypes () {
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
