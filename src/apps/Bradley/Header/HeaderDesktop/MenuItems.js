import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../../lib/bcorpUrl'
import style from './HeaderDesktop.scss'

class MenuItems extends Component {
  renderMenuItems () {
    return this.props.menuItems.map((menuItem, index) => {
      if (!menuItem['title']) {
        return
      }

      return (
        <div
          key={index}
          className={style.menuItem}>
          <Link
            to={removeHostFromUrl(menuItem['url'])}
            replace >
            <h6 className={style.menuItemLink}>{menuItem['title']}</h6>
          </Link>
        </div>
      )
    })
  }

  render () {
    if (!this.props.menuItems || this.props.menuItems === []) {
      return null
    }

    return this.renderMenuItems()
  }
}

MenuItems.propTypes = {
  menuItems: PropTypes.array
}

export default MenuItems
