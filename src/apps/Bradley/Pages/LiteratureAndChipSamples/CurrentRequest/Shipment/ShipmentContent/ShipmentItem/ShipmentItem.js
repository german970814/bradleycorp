// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions,
  ShipmentChipSampleObject,
  ShipmentLiteratureObject
} from '../../../../../../../../lib/types/cpt_types'
import BCorpNumberField from '../../../../../../../../lib/components/BCorpFilterField/BCorpNumberField'
import sharedStyle from '../../../CurrentRequest.scss'
import style from './ShipmentItem.scss'

type Props = {
  shipmentObject: ShipmentChipSampleObject | ShipmentLiteratureObject,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void
}

class ShipmentItem extends React.Component<Props> {
  handleNumberChange (newNumber: number) {
    this.props.incrementPostInShipment(
      this.props.shipmentObject.postID,
      newNumber,
      this.props.shipmentObject.post.post.post_type
    )
  }

  renderTitle () {
    return (
      <div className={`small-body ${style.title}`}>
        {this.props.shipmentObject.post.post.post_title}
      </div>
    )
  }

  renderNumber () {
    return (
      <BCorpNumberField
        min={1}
        filterState={this.props.shipmentObject.num}
        handleChange={this.handleNumberChange.bind(this)}
        className={style.number}
      />
    )
  }

  renderRemove () {
    return (
      <div
        className={sharedStyle.removeWrapper}
        onClick={() =>
          this.props.removeFromShipment(this.props.shipmentObject.post)
        }>
        <img
          src={require('../../../../../../../../images/remove/remove@2x.png')}
          className={style.remove}
        />
      </div>
    )
  }

  render () {
    return (
      <div className={style.shipmentItem}>
        {this.renderTitle()}
        {this.renderNumber()}
        {this.renderRemove()}
      </div>
    )
  }
}

export default ShipmentItem
