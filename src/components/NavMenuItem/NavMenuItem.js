import React from 'react'
import { URL } from 'url'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import style from './Product.scss'

const NavMenuItem = ({ menuItem }) => {
  return (
    <li>
      <Link to={menuItem['url']}>
        {menuItem['post_title']}
      </Link>
    </li>
  )
}

NavMenuItem.propTypes = {
  menuItem: PropTypes.object.isRequired
}

export default NavMenuItem
