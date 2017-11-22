import React, { Component } from 'react'
import NavMenuApiClient from '../../api/navMenu_client'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import Footer from '../../components/Footer/Footer'

// import style from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      primaryMenu: [],
      footerMenu: []
    }
  }

  componentDidMount () {
    const requests = this.createInitRequests()

    return this.sendInitRequests(requests)
      .then(responses => {
        this.setInitState(requests, responses)
      })
      .catch(err => {
        console.log(err)
      })
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
  createInitRequests () {
    return {
      primaryMenu: NavMenuApiClient.getNavMenu('Primary'),
      footerMenu: NavMenuApiClient.getNavMenu('Footer')
    }
  }

  /*
  * we can use this Promise to know when all init network requests are complete
  */
  // TODO: there must be a better way to do this. At the moment if one request fails then then the app can't load
  // also it wont work if the request is nested further than first child
  sendInitRequests (requests) {
    return Promise.all(Object.values(requests))
  }

  setInitState (requests, responses) {
    const newState = {}

    Object.keys(requests).forEach((key, index) => {
      newState[key] = responses[index].data
    })

    return this.setState(newState)
  }
}

export default App
