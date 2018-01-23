import React from 'react'
// import PropTypes from 'prop-types'
import style from './BurgerMenu.scss'

const BurgerMenu = props => {
  return (
    <div
      className={style.burgerMenuWrapper} >

      <span className={style.burgerMenuLine1}></span>
      <span className={style.burgerMenuLine2}></span>
      <span className={style.burgerMenuLine3}></span>

    </div>
  )
}

export default BurgerMenu
