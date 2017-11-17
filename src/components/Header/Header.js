import React from 'react'
import NavMenu from '../../containers/NavMenu/NavMenu'
import style from './Header.scss'

const Header = () => {
  return (
    <header className={style.header}>
      <NavMenu />
    </header>
  )
}

export default Header
