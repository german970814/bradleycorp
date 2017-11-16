import React, { Component } from 'react'

import style from './App.scss'

import ProductApiClient from '../api/product'

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: ''
    }
  }

  componentDidMount() {

    return getProduct().then( product => {
      this.setState({ title: product.data["post_title"] })
    })
  }

  render() {

    return (
      <div className={style.color}>
        {this.state.title}
      </div>
    )
  }
}

function getProduct() {
  let productApiClient = new ProductApiClient()
  return productApiClient.getById(9)
}
