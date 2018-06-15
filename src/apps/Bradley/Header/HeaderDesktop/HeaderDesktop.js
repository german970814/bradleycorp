// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import type { MegaMenuNavMenuItem } from '../../../../lib/types/megaMenu_types'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import MegaMenuItems from '../../../../lib/containers/MegaMenu/MegaMenuItems'
import SearchIcon from '../SearchIcon/SearchIcon'
import style, { bottombarheight, totalheight } from './HeaderDesktop.scss'

type Props = {
  menuItems: Array<MegaMenuNavMenuItem>
}

const HeaderDesktop = (props: Props) => {
  return (
    <header className={style.header}>
      <div className={style.topBarColor}>
        <div className={style.topBar}>
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

          <div className={style.country}>
            <VerticalAlignHelper />
            <img
              src={require('../../../../images/flag/flag@2x.png')}
              className={style.flag}
            />
            <div className={`small-link-gray ${style.countryText}`}>
              {'USA'}
            </div>
          </div>
        </div>
      </div>

      <div className={style.bottomBar}>
        <div className={style.logoWrapper}>
          <div className={style.logo}>
            <Link to={{ pathname: '/' }}>
              <img
                src={require('../../../../images/logo-color/logo-color@2x.png')}
                className={style.logoImage}
              />
            </Link>
          </div>
        </div>

        <div className={style.menuItems}>
          <MegaMenuItems
            type={'hover'}
            menuItems={props.menuItems}
            itemHeight={bottombarheight}
            top={totalheight}
          />
        </div>

        <SearchIcon />
      </div>
    </header>
  )
}

export default HeaderDesktop
