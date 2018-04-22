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
import Divider from '../../../../../../lib/components/Divider/Divider'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import ShippingInfo from '../ShippingInfo/ShippingInfo'
import ShipmentLiterature from './ShipmentLiterature'
import ShipmentChipSamples from './ShipmentChipSamples'
import ShipmentLegal from './ShipmentLegal'
import ShipmentItem from './ShipmentItem/ShipmentItem'
import style from './Shipment.scss'

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

class Shipment extends React.Component<Props> {
  renderLiteratureItems () {
    if (!this.props.shipment || !this.props.shipment.literature) {
      return "You haven't added any Literature yet"
    }

    return this.props.shipment.literature.map((literature, index) => {
      return (
        <ShipmentItem
          key={index}
          shipmentObject={literature}
          removeFromShipment={this.props.removeFromShipment}
          incrementPostInShipment={this.props.incrementPostInShipment}
        />
      )
    })
  }

  renderChipSampleItems () {
    if (!this.props.shipment || !this.props.shipment.chip) {
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

  renderContent () {
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

        <ShippingInfo shippingInfo={this.props.shippingInfo} />

        <ShipmentLegal />
      </div>
    )
  }

  render () {
    return (
      <BCorpWidget
        title={'Your Shipment'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        {this.renderContent()}
      </BCorpWidget>
    )
  }
}

export default Shipment
