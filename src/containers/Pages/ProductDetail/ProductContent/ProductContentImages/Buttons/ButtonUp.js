import React from 'react'
import style from './Buttons.scss'

const ButtonUp = props => {
  return (
    <div
      className={style.buttonUp} >
      <span
        className={style.vAlignHelper} />
      <img
        src={require('../../../../../../images/icon-arrow/icon-arrow-up@2x.png')} />
    </div>
  )
}

export default ButtonUp
