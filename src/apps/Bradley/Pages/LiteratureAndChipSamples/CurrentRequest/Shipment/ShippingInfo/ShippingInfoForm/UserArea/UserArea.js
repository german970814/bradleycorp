// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../../lib/types/user_types'
import type { ShippingInfoUserAreaType } from '../../../../../LiteratureAndChipSamples'
import BCorpCheckboxField from '../../../../../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'

type Props = {
  user: User,
  shippingInfoUserArea: ShippingInfoUserAreaType,
  updateUserArea: (newUserArea: ShippingInfoUserAreaType) => void
}

class UserArea extends React.Component<Props> {
  handleNormallyPurchaseFromChange (
    newNormallyPurchaseFrom: Array<string>
  ): void {
    const userArea = this.props.shippingInfoUserArea
    userArea.normallyPurchaseFrom = newNormallyPurchaseFrom
    this.props.updateUserArea(userArea)
  }

  renderNotLoggedIn () {
    return (
      <BCorpCheckboxField
        title={'I Normally Purchase From'}
        filterState={this.props.shippingInfoUserArea.normallyPurchaseFrom}
        handleChange={this.handleNormallyPurchaseFromChange.bind(this)}
        options={{
          div10: 'Div 10 Distributor',
          foodService: 'Food Service Distributor'
        }}
      />
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
