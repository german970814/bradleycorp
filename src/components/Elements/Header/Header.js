import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import HeaderMobile from './HeaderMobile/HeaderMobile'
import HeaderTablet from './HeaderTablet/HeaderTablet'
import HeaderDesktop from './HeaderDesktop/HeaderDesktop'

const Header = ({ menuItems }) => {
  return (
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
                <HeaderDesktop
                  menuItems={menuItems} />
              )
            }
          </Media>
        )
      }
    </Media>
  )
}

Header.propTypes = {
  menuItems: PropTypes.array
}

export default Header
