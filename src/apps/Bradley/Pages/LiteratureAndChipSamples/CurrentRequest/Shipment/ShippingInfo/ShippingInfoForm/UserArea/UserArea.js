// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../../lib/types/user_types'
import type { ShippingInfoUserAreaType } from '../../../../../LiteratureAndChipSamples'
import type { CheckboxObject } from '../../../../../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import BCorpCheckboxField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import sharedStyle from '../ShippingInfoForm.scss'
import style from './UserArea.scss'

type Props = {
  user: User,
  shippingInfoUserArea: ShippingInfoUserAreaType,
  updateUserArea: (newUserArea: ShippingInfoUserAreaType) => void
}

class UserArea extends React.Component<Props> {
  handleNormallyPurchaseFromChange (
    newNormallyPurchaseFrom: CheckboxObject
  ): void {
    const userArea = this.props.shippingInfoUserArea
    userArea.normallyPurchaseFrom = newNormallyPurchaseFrom
    this.props.updateUserArea(userArea)
  }

  renderNotLoggedIn () {
    return (
      <div className={`col1 ${style.normallyPurchaseFrom}`}>
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
      </div>
    )
  }

  renderLoggedIn () {
    return <div>{'logged in'}</div>
  }

  render () {
    return this.props.user ? this.renderLoggedIn() : this.renderNotLoggedIn()
  }
}

export default UserArea
