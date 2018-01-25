import React, { Component } from 'react'
import NavMenuApiClient from '../../api/navMenu_client'
import Header from '../../components/elements/Header/Header'
import Main from '../../components/Main/Main'
import Footer from '../../components/elements/Footer/Footer'
import AppInitException from '../../exceptions/AppInitException'
import style from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      primaryMenu: [],
      footerMenu: []
    }
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
  async setInitialState () {
    try {
      const primaryMenuRequest = NavMenuApiClient.getNavMenu('Primary')
      // const footerMenuRequest = NavMenuApiClient.getNavMenu('Footer')

      const primaryMenuResponse = await primaryMenuRequest
      // const footerMenuResponse = await footerMenuRequest

      this.setState({
        primaryMenu: primaryMenuResponse.data,
        // footerMenu: footerMenuResponse.data
      })
    } catch (err) {
      console.log(new AppInitException(err))
      return { ...this.state }
    }
  }
}

export default App
