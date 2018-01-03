import React from 'react'
import style from './Buttons.scss'

const ButtonLeft = props => {
  return (
    <div
      className={style.buttonLeft} >
      <span
        className={style.vAlignHelper} />
      <img
        src={require('../../../../../../images/icon-arrow/icon-arrow-l@2x.png')} />
    </div>
  )
}

export default ButtonLeft
