// @flow
import React, { Component } from 'react'
import type { MegaMenuNavMenuItem } from '../../../lib/types/megaMenu_types'
import type { ScreenSize } from '../../../lib/contexts/ScreenSizeContext'
import { withScreenSize } from '../../../lib/contexts/ScreenSizeContext'
import NavMenuApiClient from '../../../api/navMenu_client'
import HeaderMobile from './HeaderMobile/HeaderMobile'
import HeaderTablet from './HeaderTablet/HeaderTablet'
import HeaderDesktop from './HeaderDesktop/HeaderDesktop'

type Props = {
  // from withScreenSizeHOC
  screenSize: ScreenSize
}

type State = {
  menuItems: Array<MegaMenuNavMenuItem>
}

class Header extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { menuItems: [] }
  }

  componentDidMount () {
    this.getMenuItems()
  }

  render () {
    return this.props.screenSize === 'mobile' ? (
      <HeaderMobile menuItems={this.state.menuItems} />
    ) : this.props.screenSize === 'tablet' ? (
      <HeaderTablet menuItems={this.state.menuItems} />
    ) : (
      <HeaderDesktop menuItems={this.state.menuItems} />
    )
  }

  async getMenuItems () {
    try {
      const menuResponse = await NavMenuApiClient.getNavMenuByLocation(
        'primary',
        true
      )
      this.setState({ menuItems: menuResponse.data })
    } catch (err) {
      console.log(err)
      this.setState({ menuItems: [] })
    }
  }
}

export default withScreenSize(Header)
