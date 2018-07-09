// @flow
import * as React from 'react'
import type {
  CookiesBannerCookie,
  CookiesBannerCookieOption
} from '../../../types/cookie_types'
import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import Cross from '../../../components/Cross/Cross'
import FooterPanel from '../../FooterPanel/FooterPanel'
import style from './CookiesBanner.scss'

/**
 * Diplays the cookies terms and conditions in the Footer Panel.
 *
 * When the user clicks 'agree' or the cross, we store a cookie.
 * We only render if the cookie is not stored.
 */

type Props = {
  // from the withCookies HOC
  cookies: Cookies
}

type State = {
  // cookies prop doesnt seem to update and rerender when we set the cookie,
  // so we'll just hide it with state instead
  //
  // next time the page loads the cookie will be stored and found from the start
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
    return (
      <FooterPanel show={!this.bannerPreviouslyClosed() && !this.state.hide}>
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
      </FooterPanel>
    )
  }

  bannerPreviouslyClosed (): boolean {
    return this.props.cookies.get(cookieName) || false
  }
}

export default withCookies(CookiesBanner)
