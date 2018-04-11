// @flow
import React, { Component } from 'react'
import { site } from '../../../api'
import Header from '../Header/Header'
import Main from '../Main/Main'
import MainBIMRevit from '../BIMRevit/Main/Main'
import MainTheWashfountain from '../TheWashfountain/Main/Main'
import Footer from '../Footer/Footer'
import style from './App.scss'

type Props = {}

type State = {
  blur: boolean
}

class App extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      blur: false
    }
  }

  toggleBlur () {
    this.setState({ blur: !this.state.blur })
  }

  getMain () {
    switch (site) {
      case 'bcorp':
        return <Main />

      case 'thewashfountain':
        return <MainTheWashfountain />

      case 'bimrevit':
        return <MainBIMRevit />

      default:
        return <Main />
    }
  }

  render () {
    const blurClass = !this.state.blur ? style.blurOut : style.blurIn // the order here is reversed to make sure we start of un blurred
    return (
      <div className={`${style.app} ${blurClass}`}>
        <Header blurApp={this.toggleBlur.bind(this)} />

        {this.getMain()}

        <Footer />
      </div>
    )
  }
}

export default App
