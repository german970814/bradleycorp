// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../lib/types/cpt_types'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import CPTApiClient from '../../../../api/cpt_client'
import RightSidebarTemplate from '../../../../lib/containers/Templates/RightSidebarTemplate/RightSidebarTemplate'
import PostTypeSelector from './PostTypeSelector/PostTypeSelector'
import MobileShowCurrentRequestButton from './MobileShowCurrentRequestButton/MobileShowCurrentRequestButton'
import Shipment from './CurrentRequest/Shipment/Shipment'
import Downloads from './CurrentRequest/Downloads/Downloads'
import Options from './Options/Options'
import Filters from './Filters/Filters'
// import style from './LiteratureAndChipSamples.scss'

type PostTypeOptions = 'literature' | 'chipSamples'

type LiteratureFilters = {
  productLine: string,
  language: string,
  search?: string
}

type ChipSampleFilters = {
  materialType: string
}

type FiltersTypes = {
  literature: LiteratureFilters,
  chipSamples: ChipSampleFilters
}

type OptionsTypes = {
  literature?: Array<LiteraturePost>,
  chipSamples?: Array<ChipSamplePost>
}

type ShipmentTypes = Array<{
  num: number,
  postID: number,
  post: LiteraturePost | ChipSamplePost
}>

type DownloadTypes = Array<LiteraturePost>

type Props = {}

type State = {
  options: OptionsTypes,
  filters: FiltersTypes,
  shipment?: ShipmentTypes,
  downloads?: DownloadTypes,
  selected: PostTypeOptions,
  showCurrentRequestMobile: boolean
}

const productLineFilterDefault: string = 'product-line'
const languageFilterDefault: string = 'language'
const materialTypeFilterDefault: string = 'material-type'

class LiteratureAndChipSamples extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      options: {},
      filters: {
        literature: {
          productLine: productLineFilterDefault,
          language: languageFilterDefault,
          search: ''
        },
        chipSamples: {
          materialType: materialTypeFilterDefault
        }
      },
      selected: 'literature',
      showCurrentRequestMobile: false
    }
  }

  componentDidMount () {
    this.getOptions('literature')
  }

  updateShipment (newShipment: ShipmentTypes): void {
    this.setState({ shipment: newShipment })
  }

  addToShipment (postToAdd: LiteraturePost | ChipSamplePost): void {
    const postID = postToAdd.post.ID

    if (this.state.shipment) {
      const indexToUpdate = this.state.shipment.findIndex(shipment => {
        return shipment.postID === postID
      })
      const newShipment = this.state.shipment || []

      if (indexToUpdate === -1) {
        return this.setState({
          shipment: [
            ...newShipment,
            {
              num: 1,
              postID,
              post: postToAdd
            }
          ]
        })
      } else {
        newShipment[indexToUpdate].num += 1

        this.setState({ shipment: newShipment })
      }
    } else {
      return this.setState({
        shipment: [
          {
            num: 1,
            postID,
            post: postToAdd
          }
        ]
      })
    }
  }

  removeFromShipment (idToRemove: number): void {
    if (this.state.shipment) {
      const indexToRemove = this.state.shipment.findIndex(shipment => {
        return shipment.postID === idToRemove
      })
      const newShipment = this.state.shipment || []

      if (indexToRemove === -1) {
        console.warn(
          `Couldnt find post with id ${idToRemove} in shipment state`
        )
      } else {
        newShipment.splice(indexToRemove, 1)

        this.setState({ shipment: newShipment })
      }
    }
  }

  updateDownloads (newDownloads: DownloadTypes): void {
    this.setState({ downloads: newDownloads })
  }

  addToDownloads (postToAdd: LiteraturePost): void {
    const newDownloads = this.state.downloads
      ? [...this.state.downloads, postToAdd]
      : [postToAdd]
    this.setState({ downloads: newDownloads })
  }

  removeFromDownloads (idToRemove: number): void {
    if (this.state.downloads) {
      const indexToRemove = this.state.downloads.findIndex(download => {
        return download.post.ID === idToRemove
      })
      const newDownloads = this.state.downloads || []

      if (indexToRemove === -1) {
        console.warn(
          `Couldnt find post with id ${idToRemove} in download state`
        )
      } else {
        newDownloads.splice(indexToRemove, 1)

        this.setState({ downloads: newDownloads })
      }
    }
  }

  updateFilters (newFilters: FiltersTypes): void {
    this.setState({ filters: newFilters })
  }

  updateShowCurrentRequestMobile (value: boolean): void {
    this.setState({ showCurrentRequestMobile: value })
  }

  updateSelected (newSelected: PostTypeOptions): void {
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

  renderOptions (isMobile: boolean) {
    return (
      <React.Fragment>
        <PostTypeSelector
          selected={this.state.selected}
          updateSelected={this.updateSelected.bind(this)}
        />
        <Filters
          options={this.state.options}
          filters={this.state.filters}
          selected={this.state.selected}
          updateFilters={this.updateFilters.bind(this)}
        />
        {isMobile ? (
          <MobileShowCurrentRequestButton
            mobileShowCurrentRequest={this.state.showCurrentRequestMobile}
            updateMobileShowCurrentRequest={this.updateShowCurrentRequestMobile.bind(
              this
            )}
          />
        ) : null}
        <Options
          filters={this.state.filters}
          options={this.state.options}
          selected={this.state.selected}
          addToShipment={this.addToShipment.bind(this)}
          addToDownloads={this.addToDownloads.bind(this)}
          isMobile={isMobile}
        />
      </React.Fragment>
    )
  }

  renderCurrentRequest (isMobile: boolean) {
    return (
      <React.Fragment>
        {isMobile ? (
          <MobileShowCurrentRequestButton
            mobileShowCurrentRequest={this.state.showCurrentRequestMobile}
            updateMobileShowCurrentRequest={this.updateShowCurrentRequestMobile.bind(
              this
            )}
          />
        ) : null}
        <Shipment />
        <Downloads />
      </React.Fragment>
    )
  }

  renderContent (isMobile: boolean) {
    return this.state.showCurrentRequestMobile
      ? this.renderCurrentRequest(isMobile)
      : this.renderOptions(isMobile)
  }

  renderRightSidebarWidgets (isMobile: boolean) {
    return isMobile ? null : this.renderCurrentRequest(isMobile)
  }

  render () {
    console.log(this.state)
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match => (
          <RightSidebarTemplate
            data={{ page_title: 'Literature & Chip Samples' }}
            renderModules={() => this.renderContent(match)}
            renderRightSidebarWidgets={() =>
              this.renderRightSidebarWidgets(match)
            }
          />
        )}
      </Media>
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
export {
  productLineFilterDefault,
  languageFilterDefault,
  materialTypeFilterDefault
}
export type {
  PostTypeOptions,
  OptionsTypes,
  FiltersTypes,
  ShipmentTypes,
  DownloadTypes
}
