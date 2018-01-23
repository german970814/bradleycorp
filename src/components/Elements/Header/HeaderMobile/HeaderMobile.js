import React from 'react'
// import PropTypes from 'prop-types'
// import NavMenu from '../NavMenu/NavMenu'
import BurgerMenu from '../../../Partials/BurgerMenu/BurgerMenu'
import VerticalAlignHelper from '../../../Partials/VerticalAlignHelper/VerticalAlignHelper'
import style from './HeaderMobile.scss'

const HeaderMobile = props => {
  return (
    <header className={style.header}>

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

    </header>
  )
}

export default HeaderMobile
