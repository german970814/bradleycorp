// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../lib/types/cpt_types'
import RightSidebarTemplate from '../../../../lib/containers/Templates/RightSidebarTemplate/RightSidebarTemplate'
import PostTypeSelector from './PostTypeSelector/PostTypeSelector'
import Shipment from './CurrentRequest/Shipment/Shipment'
import Downloads from './CurrentRequest/Downloads/Downloads'
// import style from './LiteratureAndChipSamples.scss'

type LiteratureFilters = {
  productLine: string,
  language: string,
  search: string
}

type ChipSampleFilters = {
  materialType: string
}

type FiltersTypes = {
  literature?: LiteratureFilters,
  chipSampes?: ChipSampleFilters
}

type OptionsTypes = {
  literature?: Array<LiteraturePost>,
  chipSamples?: Array<ChipSamplePost>
}

type ShipmentTypes = {
  literature?: Array<LiteraturePost>,
  chipSamples?: Array<ChipSamplePost>
}

type DownloadTypes = {
  literature?: Array<LiteraturePost>
}

type PostTypeOptions = 'literature' | 'chipSamples'

type Props = {}

type State = {
  options: OptionsTypes,
  filters: FiltersTypes,
  shipment: ShipmentTypes,
  download: DownloadTypes,
  selected: PostTypeOptions
}

class LiteratureAndChipSamples extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      options: {},
      filters: {},
      shipment: {},
      download: {},
      selected: 'literature'
    }
  }

  updateSelected (newSelected: PostTypeOptions) {
    if (newSelected !== this.state.selected) {
      return this.setState({ selected: newSelected })
    }
  }

  renderOptions () {
    return (
      <PostTypeSelector
        selected={this.state.selected}
        updateSelected={this.updateSelected.bind(this)}
      />
    )
  }

  renderCurrentRequest () {
    return (
      <React.Fragment>
        <Shipment />
        <Downloads />
      </React.Fragment>
    )
  }

  render () {
    console.log(this.state)
    return (
      <RightSidebarTemplate
        data={{ page_title: 'Literature & Chip Samples' }}
        renderModules={this.renderOptions.bind(this)}
        renderRightSidebarWidgets={this.renderCurrentRequest.bind(this)}
      />
    )
  }
}

export default LiteratureAndChipSamples
export type {
  PostTypeOptions,
  OptionsTypes,
  FiltersTypes,
  ShipmentTypes,
  DownloadTypes
}
