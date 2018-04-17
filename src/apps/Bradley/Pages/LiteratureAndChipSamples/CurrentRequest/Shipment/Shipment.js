// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../lib/types/cpt_types'
import type { ShipmentTypes } from '../../LiteratureAndChipSamples'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import ShipmentItem from './ShipmentItem/ShipmentItem'
// import style from './Shipment.scss'

type Props = {
  shipment?: ShipmentTypes,
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void
}

class Shipment extends React.Component<Props> {
  renderLiteratureItems () {
    if (!this.props.shipment || !this.props.shipment.literature) {
      return
    }

    return this.props.shipment.literature.map((literature, index) => {
      return (
        <ShipmentItem
          key={index}
          shipmentObject={literature}
          addToShipment={this.props.addToShipment}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />
      )
    })
  }

  render () {
    const content = this.shipmentIsEmpty()
      ? 'You currently have no items in your shipment'
      : this.renderLiteratureItems()

    return (
      <BCorpWidget
        title={'Your Shipment'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        {content}
      </BCorpWidget>
    )
  }

  shipmentIsEmpty (): boolean {
    let literatureEmpty = true
    let chipSamplesEmpty = true

    if (!this.props.shipment) {
      return true
    }

    if (
      this.props.shipment.literature &&
      this.props.shipment.literature.length
    ) {
      literatureEmpty = false
    }

    if (
      this.props.shipment.chipSamples &&
      this.props.shipment.chipSamples.length
    ) {
      chipSamplesEmpty = false
    }

    if (literatureEmpty && chipSamplesEmpty) {
      return true
    } else {
      return false
    }
  }
}

export default Shipment
