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
import { shippingInfoDefault } from '../../../LiteratureAndChipSamples'
import Divider from '../../../../../../../lib/components/Divider/Divider'
import ShippingInfo from '../ShippingInfo/ShippingInfo'
import ShipmentLiterature from './ShipmentLiterature'
import ShipmentChipSamples from './ShipmentChipSamples'
import ShipmentLegal from './ShipmentLegal'
import style from './ShipmentContent.scss'

type Props = {
  shipment?: ShipmentTypes,
  shippingInfo?: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void,
  renderButton?: () => React.Node,
  isMobile: boolean
};

class ShipmentContent extends React.Component<Props> {
  render () {
    return (
      <div className={style.contentWrapper}>
        <ShipmentLiterature
          shipment={this.props.shipment}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />

        <Divider className={style.divider} fullWidth />

        <ShipmentChipSamples
          shipment={this.props.shipment}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />

        {this.props.renderButton ? (
          this.props.renderButton()
        ) : (
          <ShippingInfo
            shipment={this.props.shipment}
            shippingInfo={this.props.shippingInfo || shippingInfoDefault}
            updateShippingInfo={this.props.updateShippingInfo}
            removeFromShipment={this.props.removeFromShipment}
            incrementPostInShipment={this.props.incrementPostInShipment}
            isMobile={this.props.isMobile}
          />
        )}

        <ShipmentLegal />
      </div>
    )
  }
}

export default ShipmentContent
