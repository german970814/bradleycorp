import React, { Component } from 'react'
import NavMenuApiClient from '../../../api/navMenu_client'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import AppInitException from '../../../exceptions/AppInitException'
import style from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.defaults = {
      primaryMenu: [],
      footer: {
        menu1: [],
        menu2: [],
        menu3: [],
        social_media_icons: []
      }
    }

    this.state = this.defaults
  }

  componentDidMount () {
    this.setInitialState()
  }

  render () {
    return (
      <div
        className={style.app}>

        <Header
          menuItems={this.state.primaryMenu} />

        <Main />

        <Footer
          menu1={this.state.footer.menu1}
          menu2={this.state.footer.menu2}
          menu3={this.state.footer.menu3}
          socialMediaIcons={this.state.footer['social_media_icons']} />

      </div>
    )
  }

  /*
  * Here we add any network requests we want to be called on App init
  * - rememeber to add a default value to the state in the constructor
  * - the final top level App state will take this shape
  *
  * Network requests for menus are passed the slug of the registered menu location
  * To use a menu here, it must first be registered in the theme with wp_register_nav_menu
  */
  async setInitialState () {
    try {
      const primaryMenuRequest = NavMenuApiClient.getNavMenu('primary')
      const primaryMenuResponse = await primaryMenuRequest
      this.setState({ primaryMenu: primaryMenuResponse.data })
    } catch (err) {
      console.log(new AppInitException(err))
    }

    const footer = this.defaults.footer

    try {
      const footerMenuRequest = NavMenuApiClient.getNavMenu('footer_col_1')
      const footerResponse = await footerMenuRequest
      footer.menu1 = footerResponse.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    try {
      const footerMenuRequest2 = NavMenuApiClient.getNavMenu('footer_col_2')
      const footerResponse2 = await footerMenuRequest2
      footer.menu2 = footerResponse2.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    try {
      const footerMenuRequest3 = NavMenuApiClient.getNavMenu('footer_col_3')
      const footerResponse3 = await footerMenuRequest3
      footer.menu3 = footerResponse3.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    this.setState({ footer })
  }
}

export default App
