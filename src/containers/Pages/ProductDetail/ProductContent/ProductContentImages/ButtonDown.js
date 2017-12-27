import React from 'react'
import style from './ProductContentImages.scss'

const ButtonDown = props => {
  return (
    <div
      className={style.buttonDown} >
      <span
        className={style.vAlignHelper} />
      <img
        src={require('../../../../../images/icon-arrow/icon-arrow-r@2x.png')} />
    </div>
  )
}

export default ButtonDown
