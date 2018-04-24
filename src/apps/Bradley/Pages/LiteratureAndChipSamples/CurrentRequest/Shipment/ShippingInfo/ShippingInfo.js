// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost,
  PostTypeOptions
} from '../../../../../../../lib/types/cpt_types'
import type {
  ShipmentTypes,
  ShippingInfoType,
  ShippingInfoField
} from '../../../LiteratureAndChipSamples'
import { UserConsumer } from '../../../../../../../lib/contexts/UserContext'
import LightboxV2 from '../../../../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import LightboxTitleBannerContentBox from '../../../../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import ShipmentContent from '../ShipmentContent/ShipmentContent'
import ShippingInfoButton from './ShippingInfoButton/ShippingInfoButton'
import ShippingInfoForm from './ShippingInfoForm/ShippingInfoForm'
import ShippingInfoOrderProcessed from './ShippingInfoOrderProcessed/ShippingInfoOrderProcessed'
import style from './ShippingInfo.scss'

type Props = {
  shipment?: ShipmentTypes,
  shippingInfo: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void,
  removeFromShipment: (postToRemove: LiteraturePost | ChipSamplePost) => void,
  incrementPostInShipment: (
    idToIncrement: number,
    newNumber: number,
    postType: PostTypeOptions
  ) => void,
  isMobile: boolean
}

type stageTypes = 1 | 2 | 3

type State = {
  stage: stageTypes,
  highlightRequiredFields: boolean
}

class ShippingInfo extends React.Component<Props, State> {
  requiredFields: Array<ShippingInfoField>

  constructor (props: Props) {
    super(props)

    this.state = { stage: 1, highlightRequiredFields: false }

    this.requiredFields = [
      'fullName',
      'title',
      'mailingAddress',
      'city',
      'stateProvince',
      'postCode',
      'country',
      'email'
    ]
  }

  updateStage (newStage: stageTypes): void {
    if (newStage === 2) {
      this.setState({ highlightRequiredFields: false })
    }
    this.setState({ stage: newStage })
  }

  sendOrder (): void {
    if (this.validateForm()) {
      return this.setState({ stage: 3 })
    } else {
      return this.setState({ highlightRequiredFields: true })
    }
  }

  getContent () {
    if (this.state.stage === 1) {
      return (
        <LightboxTitleBannerContentBox title={'Please confirm your order'}>
          <ShipmentContent
            shipment={this.props.shipment}
            removeFromShipment={this.props.removeFromShipment}
            incrementPostInShipment={this.props.incrementPostInShipment}
            updateShippingInfo={this.props.updateShippingInfo}
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
            isMobile={this.props.isMobile}
          />
        </LightboxTitleBannerContentBox>
      )
    }

    if (this.state.stage === 2) {
      return (
        <LightboxTitleBannerContentBox
          title={'Enter your shipping information below.'}>
          <UserConsumer>
            {user => {
              return (
                <ShippingInfoForm
                  shippingInfo={this.props.shippingInfo}
                  updateShippingInfo={this.props.updateShippingInfo}
                  updateStage={this.updateStage.bind(this)}
                  sendOrder={this.sendOrder.bind(this)}
                  requiredFields={this.requiredFields}
                  highlightRequiredFields={this.state.highlightRequiredFields}
                  isMobile={this.props.isMobile}
                  user={user.user}
                />
              )
            }}
          </UserConsumer>
        </LightboxTitleBannerContentBox>
      )
    }

    if (this.state.stage === 3) {
      return (
        <LightboxTitleBannerContentBox title={'Order processed!'}>
          <ShippingInfoOrderProcessed />
        </LightboxTitleBannerContentBox>
      )
    }
  }

  getMaxWidth () {
    // max width includes lightbox padding
    if (this.state.stage === 2) {
      return '800px'
    }
    return '370px'
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
          return <div className={style.shippingInfo}>{this.getContent()}</div>
        }}
        onLightboxClose={() => {
          return this.updateStage(1)
        }}
        fitLightboxToContent
        fullWidth={this.state.stage === 2}
        maxWidth={this.getMaxWidth()}
      />
    )
  }

  validateForm () {
    return this.requiredFields.every(requiredField => {
      return !!this.props.shippingInfo[requiredField]
    })
  }
}

export default ShippingInfo
export type { stageTypes }
