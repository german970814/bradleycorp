import React, { Component } from 'react'
import NavMenuApiClient from '../../api/navMenu_client'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import Footer from '../../components/Footer/Footer'
import AppInitException from '../../exceptions/AppInitException'

// import style from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      primaryMenu: [],
      footerMenu: []
    }
  }

  async componentWillMount () {
    const initState = await this.getInitialState()
    this.setState(initState)
  }

  render () {
    return (
      <div>
        <Header
          menuItems={this.state.primaryMenu} />
        <Main
          products={this.state.products} />
        <Footer
          menuItems={this.state.footerMenu} />
      </div>
    )
  }

  /*
  * Here we add any network requests we want to be called on App init
  * - rememeber to add a default value to the state in the constructor
  * - the final top level App state will take this shape
  */
  async getInitialState () {
    try {
      const primaryMenuRequest = NavMenuApiClient.getNavMenu('Primary')
      const footerMenuRequest = NavMenuApiClient.getNavMenu('Footer')

      const primaryMenuResponse = await primaryMenuRequest
      const footerMenuResponse = await footerMenuRequest

      return {
        primaryMenu: primaryMenuResponse.data,
        footerMenu: footerMenuResponse.data
      }
    }
    catch(err) {
      throw new AppInitException(err)
      return { ...this.state }
    }
  }
}

export default App
