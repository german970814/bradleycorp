import React from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import MenuItems from './MenuItems'
import SearchIcon from '../SearchIcon/SearchIcon'
import style from './HeaderDesktop.scss'

const HeaderDesktop = props => {
  return (
    <header className={style.header}>

      <div
        className={style.topBarColor} >
        <div
          className={style.topBar} >

          {/*
          <div
            className={style.user} >
            <VerticalAlignHelper />
            <img
              src={require('../../../../images/avatar/avatar@2x.png')}
              className={style.avatar} />
            <div className={`small-link-gray ${style.userText}`}>{'LOGIN'}</div>
          </div>
          */}

          <div
            className={style.country} >
            <VerticalAlignHelper />
            <img
              src={require('../../../../images/flag/flag@2x.png')}
              className={style.flag} />
            <div className={`small-link-gray ${style.countryText}`}>{'USA'}</div>
          </div>

        </div>
      </div>

      <div
        className={style.bottomBar} >

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
          <MenuItems
            menuItems={props.menuItems} />
          <VerticalAlignHelper />
        </div>

        <SearchIcon
          blurApp={props.blurApp} />

      </div>

    </header>
  )
}

HeaderDesktop.propTypes = {
  menuItems: PropTypes.array.isRequired,
  blurApp: PropTypes.func
}

export default HeaderDesktop
