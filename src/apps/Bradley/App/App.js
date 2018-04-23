// @flow
import * as React from 'react'
import type { User } from '../../../lib/types/user_types'
import { site } from '../../../api'
import { UserProvider } from '../../../lib/contexts/UserContext'
import Header from '../Header/Header'
import Main from '../Main/Main'
import MainBIMRevit from '../BIMRevit/Main/Main'
import MainTheWashfountain from '../TheWashfountain/Main/Main'
import Footer from '../Footer/Footer'
import style from './App.scss'

type Props = {}

type State = {
  blur: boolean,
  user: User,
  updateUser: (user: User) => void
}

class App extends React.Component<Props, State> {
  updateUser: (user: User) => void

  constructor (props: Props) {
    super(props)

    this.updateUser = (user: User) => {
      this.setState({ user })
    }

    this.state = {
      blur: false,
      user: false,
      updateUser: this.updateUser.bind(this)
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
    const { user, updateUser } = this.state
    const blurClass = !this.state.blur ? style.blurOut : style.blurIn // the order here is reversed to make sure we start of un blurred
    return (
      <UserProvider value={{ user, updateUser }}>
        <div className={`${style.app} ${blurClass}`}>
          <Header blurApp={this.toggleBlur.bind(this)} />

          {this.getMain()}

          <Footer />
        </div>
      </UserProvider>
    )
  }
}

export default App
