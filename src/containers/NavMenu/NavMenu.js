import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavMenuApiClient from '../../api/navMenu_client'
import NavMenuItem from '../../components/NavMenuItem/NavMenuItem'
// import style from './NavMenu.scss'

class NavMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuItems: []
    }

    this.renderNavMenu = this.renderNavMenu.bind(this)
  }

  componentDidMount () {
    return NavMenuApiClient.getNavMenu()
      .then(menuItems => {
        this.setState({ menuItems: menuItems.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderNavMenu () {
    return this.state.menuItems.map(menuItem => {
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

export default NavMenu
