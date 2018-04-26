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

class ShipmentLiterature extends React.Component<Props> {
  renderLiteratureItems () {
    if (
      !this.props.shipment ||
      !this.props.shipment.literature ||
      !this.props.shipment.literature.length
    ) {
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

  render () {
    return (
      <React.Fragment>
        <h6 className={sharedStyle.title}>Literature</h6>
        <div className={style.literatureWrapper}>
          {this.renderLiteratureItems()}
        </div>
      </React.Fragment>
    )
  }
}

export default ShipmentLiterature
