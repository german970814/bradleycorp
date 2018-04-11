// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../lib/types/cpt_types'
import CPTApiClient from '../../../../api/cpt_client'
import RightSidebarTemplate from '../../../../lib/containers/Templates/RightSidebarTemplate/RightSidebarTemplate'
import PostTypeSelector from './PostTypeSelector/PostTypeSelector'
import Shipment from './CurrentRequest/Shipment/Shipment'
import Downloads from './CurrentRequest/Downloads/Downloads'
import Options from './Options/Options'
// import style from './LiteratureAndChipSamples.scss'

type PostTypeOptions = 'literature' | 'chipSamples'

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

  componentDidMount () {
    this.getOptions('literature')
  }

  updateSelected (newSelected: PostTypeOptions) {
    if (newSelected !== this.state.selected) {
      this.onUpdateSelected(newSelected)
      return this.setState({ selected: newSelected })
    }
  }

  onUpdateSelected (newSelected: PostTypeOptions) {
    if (
      newSelected === 'chipSamples' &&
      (!this.state.options.chipSamples ||
        !this.state.options.chipSamples.length)
    ) {
      this.getOptions('chipSamples')
    }
  }

  renderOptions () {
    return (
      <React.Fragment>
        <PostTypeSelector
          selected={this.state.selected}
          updateSelected={this.updateSelected.bind(this)}
        />
        <Options />
      </React.Fragment>
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

  async getOptions (postType: PostTypeOptions) {
    try {
      if (postType === 'literature') {
        const client = new CPTApiClient(postType)
        const response = await client.getLatest(-1)

        const optionsData: Array<LiteraturePost> = response.data

        const options = { ...this.state.options, literature: optionsData }
        return this.setState({ options })
      } else if (postType === 'chipSamples') {
        const client = new CPTApiClient('chip')
        const response = await client.getLatest(-1)

        const optionsData: Array<ChipSamplePost> = response.data

        const options = { ...this.state.options, chipSamples: optionsData }
        return this.setState({ options })
      }
    } catch (err) {
      console.log(err)
    }
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
