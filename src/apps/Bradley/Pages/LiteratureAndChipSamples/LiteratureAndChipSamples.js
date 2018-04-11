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

type PostTypeOptons = 'literature' | 'chipSamples'

type Props = {}

type State = {
  options: {
    literature?: Array<LiteraturePost>,
    chipSamples?: Array<ChipSamplePost>
  },
  filters: {
    literature?: LiteratureFilters,
    chipSampes?: ChipSampleFilters
  },
  shipment: {
    literature?: Array<LiteraturePost>,
    chipSamples?: Array<ChipSamplePost>
  },
  download: {
    literature?: Array<LiteraturePost>
  },
  selected: PostTypeOptons
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

  updateSelected (newSelected: PostTypeOptons) {
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
export type { PostTypeOptons }
