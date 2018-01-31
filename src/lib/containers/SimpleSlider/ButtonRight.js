import React from 'react'
import style from './SimpleSlider.scss'

const ButtonRight = props => {
  return (
    <div
      className={style.rightButton}>
      <img src={require('../../../images/icon-arrow/icon-arrow-r@2x.png')} />
    </div>
  )
}

export default ButtonRight
