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

type stageTypes = 1 | 2 | 3

type State = {
  stage: stageTypes
}

class ShippingInfo extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { stage: 1 }
  }

  updateStage (newStage: stageTypes): void {
    this.setState({ stage: newStage })
  }

  getContent () {
    if (this.state.stage === 1) {
      return (
        <ShippingInfoDisplayBox title={'Please confirm your order'}>
          <ShipmentContent
            shipment={this.props.shipment}
            removeFromShipment={this.props.removeFromShipment}
            incrementPostInShipment={this.props.incrementPostInShipment}
            renderButton={() => {
              return (
                <ShippingInfoButton
                  onClick={() => {
                    return this.updateStage(2)
                  }}
                  text={'CONFIRM & PROCEED'}
                />
              )
            }}
          />
        </ShippingInfoDisplayBox>
      )
    }

    if (this.state.stage === 2) {
      return (
        <ShippingInfoDisplayBox
          title={'Enter your shipping information below.'}>
          <div />
        </ShippingInfoDisplayBox>
      )
    }

    if (this.state.stage === 3) {
      return (
        <ShippingInfoDisplayBox title={'Order processed!'}>
          <div />
        </ShippingInfoDisplayBox>
      )
    }
  }

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
          return <React.Fragment>{this.getContent()}</React.Fragment>
        }}
        onLightboxClose={() => {
          return this.updateStage(1)
        }}
      />
    )
  }
}

export default ShippingInfo
