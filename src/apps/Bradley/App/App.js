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

    const defaults = {
      primaryMenu: [],
      footer: {
        menu_1: [],
        menu_2: [],
        menu_3: [],
        social_media_icons: []
      }
    }

    this.defaults = defaults
    this.state = defaults
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
          menu1={this.state.footer['menu_1']}
          menu2={this.state.footer['menu_2']}
          menu3={this.state.footer['menu_3']}
          socialMediaIcons={this.state.footer['social_media_icons']} />

      </div>
    )
  }

  /*
  * Here we add any network requests we want to be called on App init
  * - rememeber to add a default value to the state in the constructor
  * - the final top level App state will take this shape
  */
  async setInitialState () {
    try {
      // TODO: split these requests so we set state after each one and don't have to wait for them all.
      const primaryMenuRequest = NavMenuApiClient.getNavMenu('Primary')
      const footerMenuRequest = NavMenuApiClient.getNavMenu('Footer Column 1')
      const footerMenuRequest2 = NavMenuApiClient.getNavMenu('Footer Column 2')
      const footerMenuRequest3 = NavMenuApiClient.getNavMenu('Footer Column 3')

      const primaryMenuResponse = await primaryMenuRequest
      const footerResponse = await footerMenuRequest
      const footerResponse2 = await footerMenuRequest2
      const footerResponse3 = await footerMenuRequest3

      // once we have the complete footer endpoint we can remove this footer object
      // and put footerResponse.data in Object.assign
      const footer = {
        menu_1: footerResponse.data,
        menu_2: footerResponse2.data,
        menu_3: footerResponse3.data
      }

      this.setState({
        primaryMenu: primaryMenuResponse.data,
        footer: Object.assign({}, this.defaults.footer, footer)
      })
    } catch (err) {
      console.log(new AppInitException(err))
      return { ...this.state }
    }
  }
}

export default App
