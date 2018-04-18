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

type PostTypeOptions = 'literature' | 'chip'

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

type ShipmentLiteratureObject = {
  num: number,
  postID: number,
  post: LiteraturePost
}

type ShipmentChipSampleObject = {
  num: number,
  postID: number,
  post: ChipSamplePost
}

type ShipmentTypes = {
  literature?: Array<ShipmentLiteratureObject>,
  chip?: Array<ShipmentChipSampleObject>
}

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
    const postType = postToAdd.post.post_type

    // shipment hasnt yet been initialised
    if (!this.state.shipment) {
      this.createNewShipmentWithPost(postToAdd)
    }

    // shipment initialised but not for this post type
    if (this.state.shipment && !this.state.shipment[postType]) {
      this.createNewPostTypeInShipmentWithPost(postToAdd)
    }

    // shipment and post type in shipment already initialised
    if (this.state.shipment && this.state.shipment[postType]) {
      this.addPostToExistingShipment(postToAdd)
    }
  }

  incrementPostInShipment (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ): void {
    const shipment = this.state.shipment || {}
    const shipmentPostType = shipment[postType] || []

    if (!this.state.shipment || !this.state.shipment[postType]) {
      return
    }

    const indexToIncrement = this.state.shipment[postType].findIndex(
      shipment => {
        return shipment.postID === idToIncrement
      }
    )

    if (indexToIncrement === -1) {
      console.warn(
        `Couldnt find post with id ${idToIncrement} in shipment state`
      )
    } else {
      shipmentPostType[indexToIncrement].num = newNumber
      shipment[postType] = shipmentPostType

      this.setState({ shipment })
    }
  }

  removeFromShipment (postToRemove: LiteraturePost | ChipSamplePost): void {
    const postID = postToRemove.post.ID
    const postType = postToRemove.post.post_type
    const shipment = this.state.shipment || {}
    const shipmentPostType = shipment[postType] || []

    if (!this.state.shipment || !this.state.shipment[postType]) {
      return
    }

    const indexToRemove = this.state.shipment[postType].findIndex(shipment => {
      return shipment.postID === postID
    })

    if (indexToRemove === -1) {
      console.warn(`Couldnt find post with id ${postID} in shipment state`)
    } else {
      shipmentPostType.splice(indexToRemove, 1)
      shipment[postType] = shipmentPostType

      this.setState({ shipment })
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
      newSelected === 'chip' &&
      (!this.state.options.chipSamples ||
        !this.state.options.chipSamples.length)
    ) {
      this.getOptions('chip')
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
        <Shipment
          shipment={this.state.shipment}
          removeFromShipment={this.removeFromShipment.bind(this)}
          incrementPostInShipment={this.incrementPostInShipment.bind(this)}
        />
        <Downloads
          downloads={this.state.downloads}
          removeFromDownloads={this.removeFromDownloads.bind(this)}
        />
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
      } else if (postType === 'chip') {
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

  createNewShipmentWithPost (post: LiteraturePost | ChipSamplePost): void {
    const postID = post.post.ID
    const postType = post.post.post_type
    const shipment = {}

    shipment[postType] = [
      {
        num: 1,
        postID,
        post
      }
    ]
    this.setState({ shipment })
  }

  createNewPostTypeInShipmentWithPost (
    post: LiteraturePost | ChipSamplePost
  ): void {
    const postID = post.post.ID
    const postType = post.post.post_type

    const shipment = { ...this.state.shipment }
    shipment[postType] = [
      {
        num: 1,
        postID,
        post
      }
    ]
    this.setState({ shipment })
  }

  addPostToExistingShipment (postToAdd: LiteraturePost | ChipSamplePost): void {
    const postID = postToAdd.post.ID
    const postType = postToAdd.post.post_type
    const shipment = this.state.shipment || {}
    let shipmentPostType = shipment[postType] || []

    const indexToUpdate = shipment[postType].findIndex(shipment => {
      return shipment.postID === postID
    })

    // post hasnt already been added
    if (indexToUpdate === -1) {
      shipmentPostType = [
        ...shipmentPostType,
        {
          num: 1,
          postID,
          post: postToAdd
        }
      ]
      shipment[postType] = shipmentPostType
      return this.setState({ shipment })
    } else {
      // post already exists in shipment
      shipmentPostType[indexToUpdate].num += 1
      shipment[postType] = shipmentPostType

      return this.setState({ shipment })
    }
  }
}

function download (literature: LiteraturePost) {
  console.log('download')
}

export default LiteratureAndChipSamples
export {
  productLineFilterDefault,
  languageFilterDefault,
  materialTypeFilterDefault,
  download
}
export type {
  PostTypeOptions,
  OptionsTypes,
  FiltersTypes,
  ShipmentTypes,
  DownloadTypes,
  ShipmentChipSampleObject,
  ShipmentLiteratureObject
}
