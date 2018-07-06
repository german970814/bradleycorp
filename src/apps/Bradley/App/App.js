// @flow
import * as React from 'react'
import type { SiteType } from '../../../api'
import type { OptionsType } from '../../../lib/contexts/OptionsContext'
import type { User } from '../../../lib/types/user_types'
import type { UpdateUserType } from '../../../lib/contexts/UserContext'
import type { ScreenSize } from '../../../lib/contexts/ScreenSizeContext'
import Media from 'react-media'
import { CookiesProvider } from 'react-cookie'
import { OptionsProvider } from '../../../lib/contexts/OptionsContext'
import { UserProvider } from '../../../lib/contexts/UserContext'
import { ScreenSizeProvider } from '../../../lib/contexts/ScreenSizeContext'
import { site } from '../../../api'
import OptionsAPIClient from '../../../api/options_client'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../globals'
import Main from '../Main/Main'
import MainBIMRevit from '../BIMRevit/Main/Main'
import MainTheWashfountain from '../TheWashfountain/Main/Main'
import Footer from '../Footer/Footer'
import CookiesBanner from '../../../lib/containers/FooterPanel/CookiesBanner/CookiesBanner'
import Loading from '../../../lib/components/Loading/Loading'
import style from './App.scss'

type Props = {}

type State = {
  loading: boolean,
  options: OptionsType,
  user: User,
  updateUser: UpdateUserType
}

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      loading: true,
      options: {
        shared: {}
      },
      user: {
        id: 1,
        firstName: 'matt',
        lastName: 'wills',
        userName: 'mattwills',
        permissions: {}
      },
      // user: false,
      updateUser: (user: User): void => {
        this.setState({ user })
      }
    }
  }

  componentDidMount () {
    this.init()
  }

  async init () {
    this.setState({ loading: true })
    await this.getOptions()
    this.setState({ loading: false })
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

  getScreenSize (isMobile: boolean, isTablet: boolean): ScreenSize {
    let screenSize = 'desktop'
    if (isMobile) {
      screenSize = 'mobile'
    } else if (isTablet) {
      screenSize = 'tablet'
    }

    return screenSize
  }

  render () {
    const { options, user, updateUser } = this.state

    console.log(this.state)

    return this.state.loading ? (
      <Loading pageSize />
    ) : (
      <OptionsProvider value={{ options }}>
        <UserProvider value={{ user, updateUser }}>
          <CookiesProvider>
            <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
              {isMobile => {
                return (
                  <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                    {isTablet => {
                      const screenSize = this.getScreenSize(isMobile, isTablet)
                      return (
                        <ScreenSizeProvider value={{ screenSize }}>
                          <div id={'app'} className={`${style.app}`}>
                            <CookiesBanner />

                            {this.getMain()}

                            <Footer />
                          </div>
                        </ScreenSizeProvider>
                      )
                    }}
                  </Media>
                )
              }}
            </Media>
          </CookiesProvider>
        </UserProvider>
      </OptionsProvider>
    )
  }

  async getOptions () {
    try {
      const client = new OptionsAPIClient()
      const response = await client.getOptions()

      this.setState({ options: response.data })
    } catch (err) {
      console.log(err)
      this.setState({ options: { shared: {} } })
    }
  }
}

export default App
