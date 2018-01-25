import React from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../Partials/VerticalAlignHelper/VerticalAlignHelper'
import MenuItems from './MenuItems'
import style from './HeaderDesktop.scss'

const HeaderDesktop = props => {
  return (
    <header className={style.header}>

      <div
        className={style.topBarColor} >
        <div
          className={style.topBar} >

          <div
            className={style.user} >
            <VerticalAlignHelper />
            <img
              src={require('../../../../images/avatar/avatar@2x.png')}
              className={style.avatar} />
            <div className={style.userText}>{'LOGIN'}</div>
          </div>

          <div
            className={style.country} >
            <VerticalAlignHelper />
            <img
              src={require('../../../../images/flag/flag@2x.png')}
              className={style.flag} />
            <div className={style.countryText}>{'USA'}</div>
          </div>

        </div>
      </div>

      <div
        className={style.bottomBar} >

        <VerticalAlignHelper />

        <div
          className={style.logoWrapper} >
          <div
            className={style.logo} >
            <img
              src={require('../../../../images/logo-color/logo-color@2x.png')}
              className={style.logoImage} />
          </div>
        </div>

        <div
          className={style.menuItems} >
          <VerticalAlignHelper />
          <MenuItems
            menuItems={props.menuItems} />
        </div>

        <div
          className={style.magnifyingGlassWrapper} >
          <div
            className={style.magnifyingGlass} >
            <img
              src={require('../../../../images/magnifying-glass/magnifying-glass@2x.png')}
              className={style.magnifyingGlassImage} />
          </div>
        </div>

      </div>

    </header>
  )
}

HeaderDesktop.propTypes = {
  menuItems: PropTypes.array.isRequired
}

export default HeaderDesktop
