// @flow
import * as React from 'react'
import type { MegaMenuNavMenuItem } from '../../../../lib/types/megaMenu_types'
import BurgerMenu from '../../../../lib/components/BurgerMenu/BurgerMenu'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import SearchIcon from '../SearchIcon/SearchIcon'
import SideMenu from '../SideMenu/SideMenu'
import style, { height } from './HeaderMobile.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

type State = {
  showMenu: boolean
}

class HeaderMobile extends React.Component<Props, State> {
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
        <VerticalAlignHelper />

        <div className={style.burgerMenuWrapper}>
          <BurgerMenu
            onActivate={this.showMenu.bind(this)}
            onDeactivate={this.hideMenu.bind(this)}
          />
          <SideMenu
            menuItems={this.props.menuItems}
            top={height}
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
      </header>
    )
  }
}

export default HeaderMobile
