import React from 'react'
import PropTypes from 'prop-types'
import NavMenu from '../../components/NavMenu/NavMenu'
import style from './Header.scss'

const Header = ({ menuItems }) => {
  return (
    <header className={style.header}>
      <NavMenu
        menuItems={menuItems} />
    </header>
  )
}

Header.propTypes = {
  menuItems: PropTypes.array
}

export default Header
