// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../lib/types/user_types'
import type {
  ShippingInfoType,
  ShippingInfoField,
  ShippingInfoUserAreaType
} from '../../../../LiteratureAndChipSamples'
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
  sendOrder: () => Promise<void>,
  requiredFields: Array<ShippingInfoField>,
  highlightRequiredFields: boolean,
  isMobile: boolean,
  user: User
};

class ShippingInfoForm extends React.Component<Props> {
  updateShippingInfoProperty (
    propertyName: ShippingInfoField,
    value: string
  ): void {
    const newShippingInfo = { ...this.props.shippingInfo }
    if (propertyName !== 'user_area') {
      newShippingInfo[propertyName] = value
      return this.props.updateShippingInfo(newShippingInfo)
    }
  }

  updateShippingInfoUserArea (newUserArea: ShippingInfoUserAreaType): void {
    return this.props.updateShippingInfo({
      ...this.props.shippingInfo,
      userArea: newUserArea
    })
  }

  isRequired (fieldName: ShippingInfoField) {
    return this.props.requiredFields.includes(fieldName)
  }

  requiredHighlightClass (fieldName: ShippingInfoField) {
    if (!this.props.highlightRequiredFields) {
      return ''
    } else {
      return this.isRequired(fieldName) && !this.props.shippingInfo[fieldName]
        ? style.highlightRequired
        : ''
    }
  }

  render () {
    return (
      <div className={`row ${style.shippingInfoForm}`}>
        <div
          className={`col1 col2-tablet ${style.colWrapperLeft} ${
            style.inputWrapper
          }`}>
          <BCorpInputField
            className={this.requiredHighlightClass('full_name')}
            filterState={this.props.shippingInfo.full_name || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'full_name',
                event.target.value
              )
            }}
            placeholder={'Full Name'}
            required={this.isRequired('full_name')}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.colWrapperRight} ${
            style.inputWrapper
          }`}>
          <BCorpInputField
            className={`col1 col2-tablet ${this.requiredHighlightClass(
              'title'
            )}`}
            filterState={this.props.shippingInfo.title || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'title',
                event.target.value
              )
            }}
            placeholder={'Title'}
            required={this.isRequired('title')}
          />
        </div>

        <div className={`col1 ${style.inputWrapper}`}>
          <BCorpInputField
            className={`col1 col2-tablet ${
              style.colWrapperLeft
            } ${this.requiredHighlightClass('company_name')}`}
            filterState={this.props.shippingInfo.company_name || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'company_name',
                event.target.value
              )
            }}
            placeholder={'Company Name'}
            required={this.isRequired('company_name')}
          />
        </div>

        <div className={`col1 ${style.inputWrapper}`}>
          <BCorpInputField
            className={`col1 col2-tablet ${
              style.colWrapperLeft
            } ${this.requiredHighlightClass('mailing_address')} ${
              style.mailingAddress
            }`}
            filterState={this.props.shippingInfo.mailing_address || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'mailing_address',
                event.target.value
              )
            }}
            placeholder={'Mailing Address'}
            required={this.isRequired('mailing_address')}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperLeft
          }`}>
          <BCorpInputField
            className={this.requiredHighlightClass('city')}
            filterState={this.props.shippingInfo.city || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty('city', event.target.value)
            }}
            placeholder={'City'}
            required={this.isRequired('city')}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperRight
          }`}>
          <BCorpSelectField
            className={`col1 col2-tablet ${
              style.selectField
            } ${this.requiredHighlightClass('state_province')}`}
            defaultOptionId={0}
            defaultOptionName={'State / Province'}
            options={this.getStateProvinceOptions()}
            filterState={this.props.shippingInfo.state_province || 0}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'state_province',
                event.target.value
              )
            }}
            required={this.isRequired('state_province')}
          />
        </div>

        <div className={'col1'}>
          <div className={`row ${style.inputWrapper}`}>
            <div className={`col1 col2-tablet ${style.colWrapperLeft}`}>
              <BCorpInputField
                className={`col2 ${this.requiredHighlightClass('post_code')}`}
                filterState={this.props.shippingInfo.post_code || ''}
                handleChange={event => {
                  return this.updateShippingInfoProperty(
                    'post_code',
                    event.target.value
                  )
                }}
                placeholder={'Postal Code'}
                required={this.isRequired('post_code')}
              />
              <BCorpSelectField
                className={`col2 ${style.selectField} ${
                  style.country
                } ${this.requiredHighlightClass('country')}`}
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
                required={this.isRequired('country')}
              />
            </div>
          </div>
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperLeft
          }`}>
          <BCorpInputField
            className={this.requiredHighlightClass('email')}
            filterState={this.props.shippingInfo.email || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'email',
                event.target.value
              )
            }}
            placeholder={'Email Address'}
            required={this.isRequired('email')}
          />
        </div>

        <div
          className={`col1 col2-tablet ${style.inputWrapper} ${
            style.colWrapperRight
          } ${style.phone}`}>
          <BCorpInputField
            className={this.requiredHighlightClass('phone')}
            filterState={this.props.shippingInfo.phone || ''}
            handleChange={event => {
              return this.updateShippingInfoProperty(
                'phone',
                event.target.value
              )
            }}
            placeholder={'Phone Number 123-456-7890'}
            required={this.isRequired('phone')}
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
              return this.props.sendOrder()
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
                  return this.props.updateShippingInfo({ userArea: {} })
                }}>
                {'CLEAR FORM'}
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                className={`button-border-red ${style.clear}`}
                onClick={() => {
                  return this.props.updateShippingInfo({ userArea: {} })
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
