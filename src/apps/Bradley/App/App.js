// @flow
import * as React from 'react'
import type { SiteType } from '../../../api'
import { site } from '../../../api'
import type { User } from '../../../lib/types/user_types'
import type { UpdateUserType } from '../../../lib/contexts/UserContext'
import { UserProvider } from '../../../lib/contexts/UserContext'
import Header from '../Header/Header'
import Main from '../Main/Main'
import MainBIMRevit from '../BIMRevit/Main/Main'
import MainTheWashfountain from '../TheWashfountain/Main/Main'
import Footer from '../Footer/Footer'
import style from './App.scss'

type Props = {}

type State = {
  user: User,
  updateUser: UpdateUserType
}

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
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
    const currentSite: SiteType = site
    switch (currentSite) {
      case 'bcorp':
        return <Main />

      case 'thewashfountain':
        return <MainTheWashfountain />

      case 'bim-revit':
        return <MainBIMRevit />

      default:
        return <Main />
    }
  }

  render () {
    const { user, updateUser } = this.state

    return (
      <UserProvider value={{ user, updateUser }}>
        <div id={'app'} className={`${style.app}`}>
          <Header />

          {this.getMain()}

          <Footer />
        </div>
      </UserProvider>
    )
  }
}

export default App
