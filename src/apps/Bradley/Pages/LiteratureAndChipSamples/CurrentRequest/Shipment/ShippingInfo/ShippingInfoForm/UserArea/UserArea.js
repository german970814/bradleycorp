// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../../lib/types/user_types'
import type {
  ShippingInfoUserAreaType,
  ShippingInfoUserAreaField
} from '../../../../../LiteratureAndChipSamples'
import type { CheckboxObject } from '../../../../../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import BCorpCheckboxField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import BCorpInputField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpInputField'
import BCorpSelectField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import BCorpTextareaField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpTextareaField'
import sharedStyle from '../ShippingInfoForm.scss'
import style from './UserArea.scss'

type Props = {
  user: User,
  shippingInfoUserArea: ShippingInfoUserAreaType,
  updateUserArea: (newUserArea: ShippingInfoUserAreaType) => void
}

class UserArea extends React.Component<Props> {
  updateUserAreaProperty (
    propertyName: ShippingInfoUserAreaField,
    value: string
  ): void {
    const newUserArea = this.props.shippingInfoUserArea
    if (
      propertyName !== 'normallyPurchaseFrom' &&
      propertyName !== 'overnight'
    ) {
      newUserArea[propertyName] = value
      return this.props.updateUserArea(newUserArea)
    }
  }

  handleNormallyPurchaseFromChange (
    newNormallyPurchaseFrom: CheckboxObject
  ): void {
    const userArea = this.props.shippingInfoUserArea
    userArea.normallyPurchaseFrom = newNormallyPurchaseFrom
    this.props.updateUserArea(userArea)
  }

  handleOvernightDeliveryChange (newOvernightDelivery: CheckboxObject): void {
    const userArea = this.props.shippingInfoUserArea
    userArea.overnight = newOvernightDelivery
    this.props.updateUserArea(userArea)
  }

  renderNotLoggedIn () {
    return (
      <BCorpCheckboxField
        title={'I Normally Purchase From:'}
        className={`col1 col4x3-desktop ${style.checkboxField}`}
        checkboxOptionClassName={`col1 col3-tablet ${style.checkboxOption}`}
        otherCheckboxClassName={`col2-tablet ${sharedStyle.colWrapperLeft} ${
          style.other
        }`}
        filterState={this.props.shippingInfoUserArea.normallyPurchaseFrom}
        handleChange={this.handleNormallyPurchaseFromChange.bind(this)}
        options={{
          div10: 'Div 10 Distributor',
          foodService: 'Food Service Distributor',
          plumbing: 'Plumbing Wholesaler',
          safetyIndMRO: 'Safety/Industrial/MRO',
          janSan: 'Jan/San Distributor',
          iAmSpecifier: 'I am a Specifier'
        }}
        showOtherField
      />
    )
  }

  renderLoggedIn () {
    return (
      <React.Fragment>
        <div className={`col1 ${style.checkboxFieldOvernight}`}>
          <BCorpCheckboxField
            className={`col1 col4-tablet`}
            filterState={this.props.shippingInfoUserArea.overnight}
            handleChange={this.handleOvernightDeliveryChange.bind(this)}
            options={{
              overnight: 'Overnight Delivery'
            }}
          />
          <p className={`col1 col4x3-tablet ${style.overnightText}`}>
            {'For two day shipping, please contact '}
            <a href={'mailto:litrequest@bradleycorp.com'}>
              {'litrequest@bradleycorp.com'}
            </a>
          </p>
        </div>

        <div className={'col1'}>
          <div className={'row'}>
            <div className={'col4-tablet'} />
            <div
              className={`col1 col2-tablet ${sharedStyle.colWrapperLeft} ${
                sharedStyle.colWrapperRight
              } ${sharedStyle.inputWrapper}`}>
              <BCorpInputField
                className={style.carrier}
                filterState={this.props.shippingInfoUserArea.carrier || ''}
                handleChange={event => {
                  return this.updateUserAreaProperty(
                    'carrier',
                    event.target.value
                  )
                }}
                placeholder={'Carrier'}
              />
              <BCorpInputField
                filterState={this.props.shippingInfoUserArea.account || ''}
                handleChange={event => {
                  return this.updateUserAreaProperty(
                    'account',
                    event.target.value
                  )
                }}
                placeholder={'Account Number'}
              />
            </div>
            <div className={'col4-tablet'} />
          </div>

          <div className={`row ${style.repSelect}`}>
            <BCorpSelectField
              className={`col1 col3-tablet ${sharedStyle.selectField}`}
              defaultOptionId={0}
              defaultOptionName={'Rep Select'}
              options={this.getRepOptions()}
              filterState={this.props.shippingInfoUserArea.rep || 0}
              handleChange={event => {
                return this.updateUserAreaProperty('rep', event.target.value)
              }}
            />
          </div>

          <div className={`row`}>
            <BCorpInputField
              className={`col1 col2-tablet ${sharedStyle.colWrapperLeft}`}
              filterState={this.props.shippingInfoUserArea.requestEmail || ''}
              handleChange={event => {
                return this.updateUserAreaProperty(
                  'requestEmail',
                  event.target.value
                )
              }}
              placeholder={'Request Email Address'}
            />
          </div>

          <div className={`row`}>
            <BCorpTextareaField
              className={`col1 ${style.notes}`}
              width={'100%'}
              filterState={this.props.shippingInfoUserArea.notes || ''}
              handleChange={event => {
                return this.updateUserAreaProperty('notes', event.target.value)
              }}
              placeholder={'Please add any additional notes here.'}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={`col1 ${style.userArea}`}>
        {this.props.user ? this.renderLoggedIn() : this.renderNotLoggedIn()}
      </div>
    )
  }

  getRepOptions () {
    return {
      industrial: 'Industrial Sales',
      div10: 'DIV 10',
      div22: 'DIV 22',
      janSan: 'Jan/San',
      foodService: 'Food Service',
      ad: 'A/D'
    }
  }
}

export default UserArea
