// @flow
import React, { Component } from 'react'
import type { NavMenuItem } from '../../../lib/types/cpt_types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import AppInitException from '../../../exceptions/AppInitException'
import NavMenuApiClient from '../../../api/navMenu_client'
import HeaderMobile from './HeaderMobile/HeaderMobile'
import HeaderTablet from './HeaderTablet/HeaderTablet'
import HeaderDesktop from './HeaderDesktop/HeaderDesktop'

type Props = {
  blurApp: () => void
}

type State = {
  menuItems?: Array<NavMenuItem>
}

class Header extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      menuItems: []
    }
  }

  componentDidMount () {
    this.getMenuItems()
  }

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            // mobile
            <HeaderMobile
              menuItems={this.state.menuItems}
              blurApp={this.props.blurApp}
            />
          ) : (
            <Media query={{ maxWidth: TABLETMAXWIDTH }}>
              {match =>
                match ? (
                  // tablet
                  <HeaderTablet
                    menuItems={this.state.menuItems}
                    blurApp={this.props.blurApp}
                  />
                ) : (
                  // desktop
                  <HeaderDesktop
                    menuItems={this.state.menuItems}
                    blurApp={this.props.blurApp}
                  />
                )
              }
            </Media>
          )
        }
      </Media>
    )
  }

  async getMenuItems () {
    try {
      const primaryMenuRequest = NavMenuApiClient.getNavMenuByLocation(
        'primary'
      )
      const primaryMenuResponse = await primaryMenuRequest
      this.setState({ menuItems: primaryMenuResponse.data })
    } catch (err) {
      console.log(new AppInitException(err))
    }
  }
}

export default Header
