import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
  return linkURL.replace('http://localhost/Bradley', '')
}

export default NavMenuItem
