import React from 'react'
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

export default Header
