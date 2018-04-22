// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../../lib/types/cpt_types'
import type {
  ShipmentTypes,
  ShippingInfoType
} from '../../../LiteratureAndChipSamples'
import LightboxV2 from '../../../../../../../lib/containers/Lightbox/LightboxV2'
import ShipmentContent from '../ShipmentContent/ShipmentContent'
import ShippingInfoButton from './ShippingInfoButton/ShippingInfoButton'
import ShippingInfoDisplayBox from './ShippingInfoDisplayBox/ShippingInfoDisplayBox'

type Props = {
  shipment?: ShipmentTypes,
  shippingInfo: ShippingInfoType,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void
}

type State = {}

class ShippingInfo extends React.Component<Props, State> {
  render () {
    return (
      <LightboxV2
        renderChildren={openLightbox => {
          return (
            <ShippingInfoButton
              onClick={openLightbox}
              text={'ENTER SHIPPING INFO'}
            />
          )
        }}
        renderLightboxContents={() => {
          return (
            <ShippingInfoDisplayBox title={'Please confirm your order'}>
              <ShipmentContent
                shipment={this.props.shipment}
                removeFromShipment={this.props.removeFromShipment}
                incrementPostInShipment={this.props.incrementPostInShipment}
                renderButton={() => {
                  return null
                }}
              />
            </ShippingInfoDisplayBox>
          )
        }}
      />
    )
  }
}

export default ShippingInfo
