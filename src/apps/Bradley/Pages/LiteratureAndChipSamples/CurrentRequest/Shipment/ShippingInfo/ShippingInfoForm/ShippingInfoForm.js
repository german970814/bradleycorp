// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../lib/types/user_types'
import type {
  ShippingInfoType,
  ShippingInfoField,
  ShippingInfoUserAreaType
} from '../../../../LiteratureAndChipSamples'
import { shippingInfoDefault } from '../../../../LiteratureAndChipSamples'
import type { stageTypes } from '../ShippingInfo'
import { USStates } from '../../../../../../../../lib/externalConstantData/USStates'
import { getCountriesForSelectFieldOptions } from '../../../../../../../../lib/externalConstantData/WorldCountries'
import BCorpSelectField from '../../../../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import BCorpInputField from '../../../../../../../../lib/components/BCorpFilterField/BCorpInputField'
import UserArea from './UserArea/UserArea'
import style from './ShippingInfoForm.scss'

type Props = {
  shippingInfo: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void,
  updateStage: (newStage: stageTypes) => void,
  isMobile: boolean,
  user: User
}

class ShippingInfoForm extends React.Component<Props> {
  updateShippingInfoProperty (
    propertyName: ShippingInfoField,
    value: string
  ): void {
    const newShippingInfo = this.props.shippingInfo
    if (propertyName !== 'userArea') {
      newShippingInfo[propertyName] = value
      return this.props.updateShippingInfo(newShippingInfo)
    }
  }

  updateShippingInfoUserArea (newUserArea: ShippingInfoUserAreaType): void {
    const newShippingInfo = this.props.shippingInfo
    newShippingInfo.userArea = newUserArea
    return this.props.updateShippingInfo(newShippingInfo)
  }

  render () {
    return (
      <div className={`row ${style.shippingInfoForm}`}>
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
            className={`col1 col2-tablet ${style.selectField}`}
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

        <div className={'col1'}>
          <div className={`row ${style.inputWrapper}`}>
            <div className={`col1 col2-tablet ${style.colWrapperLeft}`}>
              <BCorpInputField
                className={`col2`}
                filterState={this.props.shippingInfo.postCode || ''}
                handleChange={event => {
                  return this.updateShippingInfoProperty(
                    'postCode',
                    event.target.value
                  )
                }}
                placeholder={'Postal Code'}
              />
              <BCorpSelectField
                className={`col2 ${style.selectField} ${style.country}`}
                defaultOptionId={0}
                defaultOptionName={'Country'}
                options={this.getCountryOptions()}
                filterState={this.props.shippingInfo.country || 0}
                handleChange={event => {
                  return this.updateShippingInfoProperty(
                    'country',
                    event.target.value
                  )
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperLeft
          }`}>
          <BCorpInputField
            filterState={this.props.shippingInfo.email || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'email',
                event.target.value
              )
            }}
            placeholder={'Email Address'}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperRight
          } ${style.phone}`}>
          <BCorpInputField
            filterState={this.props.shippingInfo.phone || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'phone',
                event.target.value
              )
            }}
            placeholder={'Phone Number 123-456-7890'}
          />
        </div>

        <div className={`col1 ${style.userArea}`}>
          <UserArea
            user={this.props.user}
            shippingInfoUserArea={this.props.shippingInfo.userArea || {}}
            updateUserArea={this.updateShippingInfoUserArea.bind(this)}
          />
        </div>

        <div className={`col1 ${style.bottomButtons}`}>
          <button
            className={style.submit}
            onClick={() => {
              return this.props.updateStage(3)
            }}>
            {'SUBMIT ORDER'}
          </button>
          {/* Need to switch button order on mobile */}
          {this.props.isMobile ? (
            <React.Fragment>
              <button
                className={`button-border-steel-grey ${style.back}`}
                onClick={() => {
                  return this.props.updateStage(1)
                }}>
                {'GO BACK'}
              </button>
              <button
                className={`button-border-red ${style.clear}`}
                onClick={() => {
                  return this.props.updateShippingInfo(shippingInfoDefault)
                }}>
                {'CLEAR FORM'}
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                className={`button-border-red ${style.clear}`}
                onClick={() => {
                  return this.props.updateShippingInfo(shippingInfoDefault)
                }}>
                {'CLEAR FORM'}
              </button>
              <button
                className={`button-border-steel-grey ${style.back}`}
                onClick={() => {
                  return this.props.updateStage(1)
                }}>
                {'GO BACK'}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  getStateProvinceOptions () {
    return USStates
  }

  getCountryOptions () {
    return getCountriesForSelectFieldOptions()
  }
}

export default ShippingInfoForm
