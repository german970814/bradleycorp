import React from 'react'
import NavMenu from '../../components/NavMenu/NavMenu'
import style from './Footer.scss'

const Footer = ({ menuItems }) => {
  return (
    <footer className={style.footer}>
      <NavMenu
        menuItems={menuItems} />
    </footer>
  )
}

export default Footer
