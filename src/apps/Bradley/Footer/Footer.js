// @flow
import * as React from 'react'
import type { NavMenuItem } from '../../../lib/types/cpt_types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../lib/bcorpUrl'
import NavMenuApiClient from '../../../api/navMenu_client'
import AppInitException from '../../../exceptions/AppInitException'
import Copyright from './Copyright/Copyright'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../globals'
import LoginItems from './FooterBottomSection/LoginItems'
import BlogLinks from './FooterBottomSection/BlogLinks'
import SocialMediaIcons from './FooterBottomSection/SocialMediaIcons'
import style from './Footer.scss'

type Props = {}

type State = {
  footer: {
    menu1?: Array<NavMenuItem>,
    menu2?: Array<NavMenuItem>,
    menu3?: Array<NavMenuItem>
  }
}

class Footer extends React.Component<Props, State> {
  defaults: State

  constructor (props: Props) {
    super(props)

    this.defaults = {
      footer: {
        menu1: [],
        menu2: [],
        menu3: []
      }
    }

    this.state = this.defaults
  }

  componentDidMount () {
    this.getMenuItems()
  }

  renderLogo () {
    return (
      <div className={style.logoWrapper}>
        <Link to={'/'}>
          <img
            src={require('../../../images/logo-white/logo@2x.png')}
            className={style.logo}
          />
        </Link>
      </div>
    )
  }

  // each menu item in these menus fills the width of 1 row
  // on mobile, tablet and desktop
  renderMenu1Col (menuItems?: Array<NavMenuItem>) {
    if (!menuItems) {
      return
    }

    return this.footerSection(
      menuItems.map((menuItem, index) => {
        return (
          <div key={index} className={'col1'}>
            <div className={style.menuItem}>
              <Link to={removeHostFromUrl(menuItem['url']) || '#'}>
                <div className={`small-link-gray ${style.menuItemLink}`}>
                  {menuItem['title']}
                </div>
              </Link>
            </div>
          </div>
        )
      })
    )
  }

  // menu items in these menus will split to fill half a row on mobile
  // they will fill the whole row width on tablet and desktop
  renderMenu2Cols (menuItems?: Array<NavMenuItem>) {
    if (!menuItems) {
      return
    }

    return this.footerSection(
      menuItems.map((menuItem, index) => {
        return (
          <div key={index} className={'col2 col1-tablet'}>
            <div className={style.menuItem}>
              <Link to={removeHostFromUrl(menuItem['url']) || '#'}>
                <div className={`small-link-gray ${style.menuItemLink}`}>
                  {menuItem['title']}
                </div>
              </Link>
            </div>
          </div>
        )
      })
    )
  }

  renderFooterBottomSectionMobile () {
    return (
      <React.Fragment>
        <div className={'col1'}>{this.footerSection(<LoginItems />)}</div>

        <div className={'col1'}>{this.footerSection(<BlogLinks />)}</div>

        <div className={'col1'}>{this.footerSection(<SocialMediaIcons />)}</div>
      </React.Fragment>
    )
  }

  renderFooterBottomSectionTabletDesktop () {
    return (
      <div className={'col3-tablet'}>
        <div className={'row'}>
          <div className={'col2'}>{this.footerSection(<LoginItems />)}</div>

          {/* We need to show different social media icons for tablet and desktop */}

          {/* tablet icons */}
          <div
            className={`col2 ${style.socialMediaIconsWrapper} ${
              style.socialMediaIconsWrapperTablet
            }`}>
            {this.footerSection(<SocialMediaIcons tablet />)}
          </div>

          {/* desktop icons */}
          <div
            className={`col2 ${style.socialMediaIconsWrapper} ${
              style.socialMediaIconsWrapperDesktop
            }`}>
            {this.footerSection(<SocialMediaIcons />)}
          </div>
        </div>

        <div className={style.blogLinksDesktop}>
          <BlogLinks />
        </div>
      </div>
    )
  }

  footerSection (content) {
    return (
      <React.Fragment>
        <div className={`row ${style.footerSection}`}>{content}</div>

        <div className={style.divider} />
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={style.footerColor}>
        <div className={`row ${style.footerWrapper}`}>
          <div className={'col1 col6-tablet'}>{this.renderLogo()}</div>

          <div className={'col1 col6-tablet'}>
            {this.renderMenu2Cols(this.state.footer.menu1)}
          </div>

          <div className={'col1 col6-tablet'}>
            {this.renderMenu1Col(this.state.footer.menu2)}
          </div>

          <div className={'col1 col6-tablet'}>
            {this.renderMenu1Col(this.state.footer.menu3)}
          </div>

          <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
            {match => {
              return match
                ? this.renderFooterBottomSectionMobile()
                : this.renderFooterBottomSectionTabletDesktop()
            }}
          </Media>
        </div>

        <div className={`row ${style.footerWrapper}`}>
          <Copyright />
        </div>
      </div>
    )
  }

  async getMenuItems () {
    const footer = this.defaults.footer

    try {
      const footerMenuRequest = NavMenuApiClient.getNavMenuByLocation(
        'footer_col_1'
      )
      const footerResponse = await footerMenuRequest
      footer.menu1 = footerResponse.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    try {
      const footerMenuRequest2 = NavMenuApiClient.getNavMenuByLocation(
        'footer_col_2'
      )
      const footerResponse2 = await footerMenuRequest2
      footer.menu2 = footerResponse2.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    try {
      const footerMenuRequest3 = NavMenuApiClient.getNavMenuByLocation(
        'footer_col_3'
      )
      const footerResponse3 = await footerMenuRequest3
      footer.menu3 = footerResponse3.data || []
    } catch (err) {
      console.log(new AppInitException(err))
    }

    this.setState({ footer })
  }
}

export default Footer
