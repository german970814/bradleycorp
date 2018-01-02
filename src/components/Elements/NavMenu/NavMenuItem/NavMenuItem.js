import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { host } from '../../../../api'
import style from './NavMenuItem.scss'

const NavMenuItem = (props) => {
  return (
    <li
      className={[style.navMenuItem, props.menuItemClass].join(' ')} >
      <NavLink
        to={formatLinkURL(props.menuItem['url'])}
        replace
        activeClassName={style.active} >
        {props.menuItem['title']}
      </NavLink>
    </li>
  )
}

NavMenuItem.propTypes = {
  menuItem: PropTypes.object.isRequired,
  menuItemClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])
}

function formatLinkURL (linkURL) {
  return linkURL.replace(host, '')
}

export default NavMenuItem
