import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { host } from '../../api'
// import style from './Product.scss'

const NavMenuItem = ({ menuItem }) => {
  return (
    <li>
      <Link to={formatLinkURL(menuItem['url'])} replace>
        {menuItem['title']}
      </Link>
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
