// @flow
import * as React from 'react'
import type { User } from '../../../../../../../../../lib/types/user_types'
import type { ShippingInfoUserAreaType } from '../../../../../LiteratureAndChipSamples'

type Props = {
  user: User,
  shippingInfoUserArea: ShippingInfoUserAreaType,
  updateUserArea: (newUerArea: ShippingInfoUserAreaType) => void
}

class UserArea extends React.Component<Props> {
  renderNotLoggedIn () {
    return <div>{'not logged in'}</div>
  }

  renderLoggedIn () {
    return <div>{'logged in'}</div>
  }

  render () {
    return this.props.user ? this.renderLoggedIn() : this.renderNotLoggedIn()
  }
}

export default UserArea
