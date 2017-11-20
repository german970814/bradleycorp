import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavMenuItem from '../NavMenuItem/NavMenuItem'
// import style from './NavMenu.scss'

class NavMenu extends Component {
  constructor (props) {
    super(props)

    this.renderNavMenu = this.renderNavMenu.bind(this)
  }

  renderNavMenu () {
    return this.props.menuItems.map(menuItem => {
      return (
        <NavMenuItem
          key={menuItem.ID}
          menuItem={menuItem} />
      )
    })
  }

  render () {
    return (
      <ul>
        {this.renderNavMenu()}
      </ul>
    )
  }
}

NavMenu.propTypes = {
  menuItems: PropTypes.array.isRequired
}

export default NavMenu
