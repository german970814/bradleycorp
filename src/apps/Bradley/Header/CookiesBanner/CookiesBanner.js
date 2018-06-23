// @flow
import * as React from 'react'
import type {
  CookiesBannerCookie,
  CookiesBannerCookieOption
} from '../../../../lib/types/cookie_types'
import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import Cross from '../../../../lib/components/Cross/Cross'
import style from './CookiesBanner.scss'

type Props = {
  cookies: Cookies
}

type State = {
  // cookies prop doesnt seem to update and rerender when we set the cookie,
  // so we'll just hide it with state instead
  hide: boolean
}

const cookieName: CookiesBannerCookie = 'BcorpCookiesBanner'
const text =
  'We use cookies to ensure you receive the best experience when you use our website. By using our website, you agree to our use of cookies.'

class CookiesBanner extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { hide: false }
  }

  closeBanner () {
    const cookieOption: CookiesBannerCookieOption = true
    this.props.cookies.set(cookieName, cookieOption)
    this.setState({ hide: true })
  }

  render () {
    if (this.bannerPreviouslyClosed() || this.state.hide) {
      return null
    }

    return (
      <div className={`small-body ${style.CookiesBanner}`}>
        {text}
        <Link to="/privacy">
          <span className={`small-body ${style.learnMore}`}>
            {' Learn More'}
          </span>
        </Link>
        <div className={style.crossWrapper}>
          <Cross onClick={this.closeBanner.bind(this)} size={14} />
        </div>
      </div>
    )
  }

  bannerPreviouslyClosed (): boolean {
    return this.props.cookies.get(cookieName) || false
  }
}

export default withCookies(CookiesBanner)
