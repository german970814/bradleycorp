import React from 'react'
import style from './ProductContentImages.scss'

const ButtonUp = props => {
  return (
    <div
      className={style.buttonUp} >
      <span
        className={style.vAlignHelper} />
      <img
        src={require('../../../../../images/icon-arrow/icon-arrow-l@2x.png')} />
    </div>
  )
}

export default ButtonUp
