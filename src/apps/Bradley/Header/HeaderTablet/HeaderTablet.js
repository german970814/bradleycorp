// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../lib/types/megaMenu_types'
import BurgerMenu from '../../../../lib/components/BurgerMenu/BurgerMenu'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import SearchIcon from '../SearchIcon/SearchIcon'
import SideMenu from '../SideMenu/SideMenu'
import style, { totalheight } from './HeaderTablet.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

type State = {
  showMenu: boolean
}

class HeaderTablet extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { showMenu: false }
  }

  showMenu () {
    this.setState({ showMenu: true })
  }

  hideMenu () {
    this.setState({ showMenu: false })
  }

  render () {
    return (
      <header className={style.header}>
        <div className={style.topBar}>
          <VerticalAlignHelper />

          {/*
          <div
            className={style.user} >
            <img
              src={require('../../../../images/avatar/avatar@2x.png')}
              className={style.avatar} />
            <span className={style.userText}>{'LOGIN'}</span>
          </div>
          */}

          <div className={style.country}>
            <img
              src={require('../../../../images/flag/flag@2x.png')}
              className={style.flag}
            />
            <span className={style.countryText}>{'USA'}</span>
          </div>
        </div>

        <div className={style.bottomBar}>
          <VerticalAlignHelper />

          <div className={style.burgerMenuWrapper}>
            <BurgerMenu
              onActivate={this.showMenu.bind(this)}
              onDeactivate={this.hideMenu.bind(this)}
            />
            <SideMenu
              menuItems={this.props.menuItems}
              top={totalheight}
              show={this.state.showMenu}
            />
          </div>

          <div className={style.logoWrapper}>
            <div className={style.logo}>
              <img
                src={require('../../../../images/logo-color/logo-color@2x.png')}
                className={style.logoImage}
              />
            </div>
          </div>

          <SearchIcon />
        </div>
      </header>
    )
  }
}

export default HeaderTablet
