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
            {menuItem['title']}
          </Link>
        </div>
      )
    })
  }

  render () {
    if (!this.props.menuItems || this.props.menuItems === []) {
      return null
    }

    return (
      <React.Fragment>
        {this.renderMenuItems()}
      </React.Fragment>
    )
  }
}

MenuItems.propTypes = {
  menuItems: PropTypes.array
}

export default MenuItems
