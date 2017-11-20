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
      menuItems: [],

    }
  }

  componentDidMount() {
    const requests = this.createInitRequests()

    return this.sendInitRequests(requests)
    .then( responses => {
      this.setInitState( requests, responses )
    })
    .catch( err => {
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

  createInitRequests() {
    const productApiClient = new ProductApiClient()

    return {
      menuItems: NavMenuApiClient.getNavMenu(),
      products: productApiClient.get()
    }
  }

  sendInitRequests( requests ) {
    return Promise.all( Object.values(requests) )
  }

  setInitState( requests, responses ) {
    let newState = {}

    Object.keys(requests).forEach( (key, index) => {
      newState[key] = responses[index].data
    })

    return this.setState( newState )
  }
}


export default App
