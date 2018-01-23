import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import HeaderMobile from './HeaderMobile/HeaderMobile'

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
                <HeaderMobile
                  menuItems={menuItems} />
              ) : (
                // desktop
                <HeaderMobile
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
