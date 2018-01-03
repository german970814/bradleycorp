import React from 'react'
import style from './ProductContentImagesMobileTablet.scss'

const ButtonRight = props => {
  return (
    <div
      className={style.buttonRight} >
      <span
        className={style.vAlignHelper} />
      <img
        src={require('../../../../../../images/icon-arrow/icon-arrow-r@2x.png')} />
    </div>
  )
}

export default ButtonRight
