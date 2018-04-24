// @flow
import * as React from 'react'
import { site } from '../../../api'
import type { User } from '../../../lib/types/user_types'
import type { UpdateBlurType } from '../../../lib/contexts/BlurContext'
import type { UpdateUserType } from '../../../lib/contexts/UserContext'
import { UserProvider } from '../../../lib/contexts/UserContext'
import { BlurProvider } from '../../../lib/contexts/BlurContext'
import Header from '../Header/Header'
import Main from '../Main/Main'
import MainBIMRevit from '../BIMRevit/Main/Main'
import MainTheWashfountain from '../TheWashfountain/Main/Main'
import Footer from '../Footer/Footer'
import style from './App.scss'

type Props = {}

type State = {
  isBlurred: boolean,
  updateBlur: UpdateBlurType,
  user: User,
  updateUser: UpdateUserType
}

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isBlurred: false,
      updateBlur: (isBlurred: boolean): void => {
        this.setState({ isBlurred })
      },
      /* user: {
        id: 1,
        firstName: 'matt',
        lastName: 'wills',
        userName: 'mattwills',
        permissions: {}
      }, */
      user: false,
      updateUser: (user: User): void => {
        this.setState({ user })
      }
    }
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
    const { user, updateUser, isBlurred, updateBlur } = this.state
    const blurClass = !isBlurred ? style.blurOut : style.blurIn // the order here is reversed to make sure we start of un blurred
    return (
      <BlurProvider value={{ isBlurred, updateBlur }}>
        <UserProvider value={{ user, updateUser }}>
          <div className={`${style.app} ${blurClass}`}>
            <Header />

            {this.getMain()}

            <Footer />
          </div>
        </UserProvider>
      </BlurProvider>
    )
  }
}

export default App
