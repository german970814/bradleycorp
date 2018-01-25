import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { removeHostFromUrl } from '../../../lib/bcorpUrl'
import Copyright from './Copyright/Copyright'
// import Media from 'react-media'
// import { MOBILEMAXWIDTH } from '../../../globals'
// import FooterMobile from './FooterMobile/FooterMobile'
import style from './Footer.scss'

class Footer extends Component {
  renderLogo () {
    return (
      <div
        className={style.logoWrapper} >
        <Link
          to={'/'}
          replace >
          <img
            src={require('../../../images/logo-white/logo@2x.png')}
            className={style.logo} />
        </Link>
      </div>
    )
  }

  // each menu item in these menus fills the width of 1 row
  // on mobile, tablet and desktop
  renderMenu1Col (menuItems) {
    if (menuItems.length === 0) {
      return
    }

    return (
      <React.Fragment>

        <div className={`row ${style.footerSection}`} >
          {
            menuItems.map((menuItem, index) => {
              return (
                <div
                  key={index}
                  className={'col1'} >
                  <div
                    className={style.menuItem} >
                    <Link
                      to={removeHostFromUrl(menuItem['url']) || '#'}
                      replace >
                      {menuItem['title']}
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={style.divider} />

      </React.Fragment>
    )
  }

  // menu items in these menus will split to fill half a row on mobile
  // they will fill the whole row width on tablet and desktop
  renderMenu2Cols (menuItems) {
    if (menuItems.length === 0) {
      return
    }

    return (
      <React.Fragment>

        <div className={`row ${style.footerSection}`} >
          {
            menuItems.map((menuItem, index) => {
              return (
                <div
                  key={index}
                  className={'col2 col1-tablet'} >
                  <div
                    className={style.menuItem} >
                    <Link
                      to={removeHostFromUrl(menuItem['url']) || '#'}
                      replace >
                      {menuItem['title']}
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={style.divider} />

      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={style.footerColor} >
        <div className={`row ${style.footerWrapper}`} >

          <div className={'col1 col6-tablet'} >
            {this.renderLogo()}
          </div>

          <div className={'col1 col6-tablet'} >
            {this.renderMenu2Cols(this.props.menu1)}
          </div>

          <div className={'col1 col6-tablet'} >
            {this.renderMenu1Col(this.props.menu2)}
          </div>

          <div className={'col1 col6-tablet'} >
            {this.renderMenu1Col(this.props.menu3)}
          </div>

          {/* <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
            {match =>
              match ? (
                // mobile
                <FooterMobile
                  menu1={props.menu1}
                  menu2={props.menu2}
                  menu3={props.menu3}
                  socialMediaIcons={props.socialMediaIcons} />
              ) : (
                // tablet - desktop
                <FooterMobile
                  menu1={props.menu1}
                  menu2={props.menu2}
                  menu3={props.menu3}
                  socialMediaIcons={props.socialMediaIcons} />
              )
            }
          </Media> */}

        </div>

        <div className={`row ${style.footerWrapper}`} >
          <Copyright />
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  menu1: PropTypes.array,
  menu2: PropTypes.array,
  menu3: PropTypes.array,
  socialMediaIcons: PropTypes.array
}

export default Footer
