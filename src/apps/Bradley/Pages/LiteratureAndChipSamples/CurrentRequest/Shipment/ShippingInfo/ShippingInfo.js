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
import ShippingRequestAPIClient from '../../../../../../../api/shippingRequest_client'
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
  highlightRequiredFields: boolean,
  shippingId?: number
};

class ShippingInfo extends React.Component<Props, State> {
  requiredFields: Array<ShippingInfoField>

  constructor (props: Props) {
    super(props)

    this.state = { stage: 1, highlightRequiredFields: false }

    this.requiredFields = [
      'full_name',
      'title',
      'mailing_address',
      'city',
      'state_province',
      'post_code',
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

  resetOrderNumber (): void {
    this.setState({ shippingId: 0 })
  }

  async sendOrder (): Promise<void> {
    if (this.validateForm()) {
      const shippingId = await this.sendShippingRequest()
      if (!shippingId || shippingId === 0) {
        console.warn(
          'Received invalid shipping ID, or coudnt post shipping request'
        )
      } else {
        return this.setState({ stage: 3, shippingId })
      }
    } else {
      return this.setState({ highlightRequiredFields: true })
    }
  }

  getContent () {
    if (this.state.stage === 1) {
      return (
        <LightboxTitleBannerContentBox title={'Please confirm your order.'}>
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
          <ShippingInfoOrderProcessed id={this.state.shippingId || 0} />
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
          this.updateStage(1)
          this.resetOrderNumber()
        }}
        fitLightboxToContent
        fullWidth={this.state.stage === 2}
        maxWidth={this.getMaxWidth()}
      />
    )
  }

  async sendShippingRequest (): Promise<number | void> {
    try {
      if (
        !this.props.shipment ||
        Object.keys(this.props.shipment).length === 0
      ) {
        return 0
      }

      const shippingRequest = {
        /*
        TODO: UPDATE THIS
         */
        userID: 1,
        shippingInfo: this.props.shippingInfo,
        items: this.props.shipment
      }
      const response = await ShippingRequestAPIClient.postNewShippingRequest(
        shippingRequest
      )

      console.log(response)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  validateForm () {
    const validateUserArea = (this.props.shippingInfo.userArea.overnight && this.props.shippingInfo.userArea.overnight.checkboxes) ?
      this.props.shippingInfo.userArea.overnight.checkboxes.length >= 1 : false
    const requiredFields: Array<any> = validateUserArea ? [
      'userArea.carrier', 'userArea.account',
      ...this.requiredFields
    ] : this.requiredFields

    return requiredFields.every(requiredField => {
      let shippingInfo = this.props.shippingInfo
      requiredField.split('.').forEach((attribute) => {
        if (shippingInfo) {
          const descriptor = Object.getOwnPropertyDescriptor(shippingInfo, attribute)
          shippingInfo = descriptor ? descriptor.value : descriptor
        }
      })
      return !!shippingInfo
    })
  }
}

export default ShippingInfo
export type { stageTypes }
