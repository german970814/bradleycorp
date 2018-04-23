// @flow
import * as React from 'react'
import type {
  ShippingInfoType,
  ShippingInfoField
} from '../../../../LiteratureAndChipSamples'
import BCorpSelectField from '../../../../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import BCorpInputField from '../../../../../../../../lib/components/BCorpFilterField/BCorpInputField'
import style from './ShippingInfoForm.scss'

type Props = {
  shippingInfo: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void
}

class ShippingInfoForm extends React.Component<Props> {
  updateShippingInfoProperty (propertyName: ShippingInfoField, value: string) {
    const newShippingInfo = this.props.shippingInfo
    newShippingInfo[propertyName] = value
    return this.props.updateShippingInfo(newShippingInfo)
  }

  render () {
    return (
      <div className={style.shippingInfoForm}>
        <div
          className={`col1 col2-tablet ${style.colWrapperLeft} ${
            style.inputWrapper
          }`}>
          <BCorpInputField
            filterState={this.props.shippingInfo.fullName || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'fullName',
                event.target.value
              )
            }}
            placeholder={'Full Name'}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.colWrapperRight} ${
            style.inputWrapper
          }`}>
          <BCorpInputField
            className={`col1 col2-tablet`}
            filterState={this.props.shippingInfo.title || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'title',
                event.target.value
              )
            }}
            placeholder={'Title'}
          />
        </div>

        <div className={`col1 ${style.inputWrapper}`}>
          <BCorpInputField
            className={`col1 col2-tablet ${style.colWrapperLeft}`}
            filterState={this.props.shippingInfo.companyName || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'companyName',
                event.target.value
              )
            }}
            placeholder={'Company Name'}
          />
        </div>

        <div className={`col1 ${style.inputWrapper}`}>
          <BCorpInputField
            className={`col1 col2-tablet ${style.colWrapperLeft}`}
            filterState={this.props.shippingInfo.mailingAddress || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'mailingAddress',
                event.target.value
              )
            }}
            placeholder={'Mailing Address'}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperLeft
          }`}>
          <BCorpInputField
            filterState={this.props.shippingInfo.city || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty('city', event.target.value)
            }}
            placeholder={'City'}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperRight
          }`}>
          <BCorpSelectField
            className={`col1 col2-tablet`}
            defaultOptionId={0}
            defaultOptionName={'State / Province'}
            options={this.getStateProvinceOptions()}
            filterState={this.props.shippingInfo.stateProvince || 0}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'stateProvince',
                event.target.value
              )
            }}
          />
        </div>
      </div>
    )
  }

  getStateProvinceOptions () {
    return {
      '1': 'New York State',
      '2': 'Ohio',
      '3': 'California',
      '4': 'Florida'
    }
  }
}

export default ShippingInfoForm
