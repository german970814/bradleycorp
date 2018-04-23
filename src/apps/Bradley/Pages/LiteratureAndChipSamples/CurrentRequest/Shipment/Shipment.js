// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../lib/types/cpt_types'
import type {
  ShipmentTypes,
  ShippingInfoType
} from '../../LiteratureAndChipSamples'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import ShipmentContent from './ShipmentContent/ShipmentContent'

type Props = {
  shipment?: ShipmentTypes,
  shippingInfo: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void
}

class Shipment extends React.Component<Props> {
  render () {
    return (
      <BCorpWidget
        title={'Your Shipment'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        <ShipmentContent
          shipment={this.props.shipment}
          shippingInfo={this.props.shippingInfo}
          updateShippingInfo={this.props.updateShippingInfo}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />
      </BCorpWidget>
    )
  }
}

export default Shipment
