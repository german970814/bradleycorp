// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../lib/types/cpt_types'
import type { ShipmentTypes } from '../../LiteratureAndChipSamples'
import Divider from '../../../../../../lib/components/Divider/Divider'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import ShipmentItem from './ShipmentItem/ShipmentItem'
import sharedStyle from '../CurrentRequest.scss'
import style from './Shipment.scss'

type Props = {
  shipment?: ShipmentTypes,
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

  renderLegal () {
    return (
      <div className={style.legalWrapper}>
        <p className={`legal ${style.legal}`}>
          {
            'Note: Most orders ship within 2 business days. Larger orders may require additional processing time.'
          }
        </p>
        <p className={`legal ${style.legal}`}>
          {'For questions about your order, please contact '}
          <a href="mailto:litrequest@bradleycorp.com">
            {'litrequest@bradleycorp.com'}
          </a>
        </p>
        <p className={`legal ${style.legal}`}>
          {
            'Please include the order number provided at the end of this transaction.'
          }
        </p>
      </div>
    )
  }

  renderContent () {
    return (
      <div className={style.contentWrapper}>
        <h6 className={sharedStyle.title}>Literature</h6>
        <div className={style.literatureWrapper}>
          {this.renderLiteratureItems()}
        </div>

        <Divider className={style.divider} fullWidth />

        <h6 className={sharedStyle.title}>Chip Samples</h6>
        <div className={style.chipSamplesWrapper}>
          {this.renderChipSampleItems()}
        </div>

        <div className={style.buttonWrapper}>
          <button className={style.button}>{'ENTER SHIPPING INFO'}</button>
        </div>

        {this.renderLegal()}
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
