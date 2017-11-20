import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import style from './Product.scss'

const NavMenuItem = ({ menuItem }) => {
  return (
    <li>
      <Link to={getLinkURL(menuItem)} replace>
        {menuItem['title']}
      </Link>
    </li>
  )
}

NavMenuItem.propTypes = {
  menuItem: PropTypes.object.isRequired
}

function getLinkURL (menuItem) {
  let url = ''

  switch (menuItem['type_label']) {
    case 'Custom Link':
      url = menuItem['url']
      break
    case 'Page':
      url = menuItem['url']
      break
    default:
      url = menuItem['guid']
      break
  }
  return formatLinkURL(url)
}

function formatLinkURL (linkURL) {
  return linkURL.replace('http://localhost/Bradley', '')
}

export default NavMenuItem
