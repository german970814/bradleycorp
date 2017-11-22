import React, { Component } from 'react'
import NavMenuApiClient from '../../api/navMenu_client'
import ProductApiClient from '../../api/product_client'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import Footer from '../../components/Footer/Footer'

// import style from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuItems: []
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
          menuItems={this.state.menuItems} />
        <Main
          products={this.state.products} />
        <Footer
          menuItems={this.state.menuItems} />
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
      menuItems: NavMenuApiClient.getNavMenu()
    }
  }

  /*
  * we can use this Promise to know when all init network requests are complete
  */
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
