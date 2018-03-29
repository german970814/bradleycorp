import React from 'react'
import PropTypes from 'prop-types'
import BurgerMenu from '../../../../lib/components/BurgerMenu/BurgerMenu'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import SearchIcon from '../SearchIcon/SearchIcon'
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

      <SearchIcon
        blurApp={props.blurApp} />

    </header>
  )
}

HeaderMobile.propTypes = {
  menuItems: PropTypes.array,
  blurApp: PropTypes.func
}

export default HeaderMobile
