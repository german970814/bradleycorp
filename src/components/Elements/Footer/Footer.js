import React from 'react'
import PropTypes from 'prop-types'
import NavMenu from '../NavMenu/NavMenu'
import style from './Footer.scss'

const Footer = ({ menuItems }) => {
  return (
    <footer className={style.footer}>
      <NavMenu
        menuItems={menuItems} />
    </footer>
  )
}

Footer.propTypes = {
  menuItems: PropTypes.array
}

export default Footer
