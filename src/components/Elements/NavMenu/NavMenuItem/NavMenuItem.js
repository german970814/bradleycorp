import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { host } from '../../../../api'
import style from './NavMenuItem.scss'

const NavMenuItem = ({ menuItem }) => {
  return (
    <li
      className={style.navMenuItem} >
      <NavLink
        to={formatLinkURL(menuItem['url'])}
        replace
        activeClassName={style.active} >
        {menuItem['title']}
      </NavLink>
    </li>
  )
}

NavMenuItem.propTypes = {
  menuItem: PropTypes.object.isRequired
}

function formatLinkURL (linkURL) {
  return linkURL.replace(host, '')
}

export default NavMenuItem
