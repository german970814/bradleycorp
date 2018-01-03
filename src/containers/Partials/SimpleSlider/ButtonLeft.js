import React from 'react'
import style from './SimpleSlider.scss'

const ButtonLeft = props => {
  return (
    <div
      className={style.leftButton}>
      <img src={require('../../../images/icon-arrow/icon-arrow-l@2x.png')} />
    </div>
  )
}

export default ButtonLeft
