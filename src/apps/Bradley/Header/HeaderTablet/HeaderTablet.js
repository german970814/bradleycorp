import React from 'react'
import BurgerMenu from '../../../../lib/components/BurgerMenu/BurgerMenu'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './HeaderTablet.scss'

const HeaderTablet = props => {
  return (
    <header className={style.header}>

      <div
        className={style.topBar} >

        <VerticalAlignHelper />

        <div
          className={style.user} >
          <img
            src={require('../../../../images/avatar/avatar@2x.png')}
            className={style.avatar} />
          <span className={style.userText}>{'LOGIN'}</span>
        </div>

        <div
          className={style.country} >
          <img
            src={require('../../../../images/flag/flag@2x.png')}
            className={style.flag} />
          <span className={style.countryText}>{'USA'}</span>
        </div>

      </div>

      <div
        className={style.bottomBar} >

        <VerticalAlignHelper />

        <div
          className={style.burgerMenuWrapper} >
          <BurgerMenu />
        </div>

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

export default HeaderTablet
