import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import NavMenu from '../NavMenu/NavMenu'
import style from './Header.scss'
/*import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import HeaderMobile from './HeaderMobile/HeaderMobile'
import HeaderTablet from './HeaderTablet/HeaderTablet'*/

const Header = ({ menuItems }) => {
  return (
    <header className={style.header}>
      <div className={style.topBar}></div>
      <NavMenu
        menuItems={menuItems} />
    </header>
  )
  /*return (
    <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
      {match =>
        match ? (
          // mobile
          <HeaderMobile
            menuItems={menuItems} />
        ) : (
          <Media query={{ maxWidth: TABLETMAXWIDTH }}>
            {match =>
              match ? (
                // tablet
                <HeaderTablet
                  menuItems={menuItems} />
              ) : (
                // desktop
                <HeaderTablet
                  menuItems={menuItems} />
              )
            }
          </Media>
        )
      }
    </Media>
  )*/
}

Header.propTypes = {
  menuItems: PropTypes.array
}

export default Header
