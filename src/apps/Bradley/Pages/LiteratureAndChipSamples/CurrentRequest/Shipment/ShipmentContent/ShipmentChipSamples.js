// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../../lib/types/cpt_types'
import type { ShipmentTypes } from '../../../LiteratureAndChipSamples'
import ShipmentItem from './ShipmentItem/ShipmentItem'
import sharedStyle from '../../CurrentRequest.scss'
import style from './ShipmentContent.scss'

type Props = {
  shipment?: ShipmentTypes,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void
}

class ShipmentChipSamples extends React.Component<Props> {
  renderChipSampleItems () {
    if (
      !this.props.shipment ||
      !this.props.shipment.chip ||
      !this.props.shipment.chip.length
    ) {
      return "You haven't added any Chip Samples yet"
    }

    return this.props.shipment.chip.map((chipSample, index) => {
      return (
        <ShipmentItem
          key={index}
          shipmentObject={chipSample}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />
      )
    })
  }

  render () {
    return (
      <React.Fragment>
        <h6 className={sharedStyle.title}>Chip Samples</h6>
        <div className={style.chipSamplesWrapper}>
          {this.renderChipSampleItems()}
        </div>
      </React.Fragment>
    )
  }
}

export default ShipmentChipSamples
