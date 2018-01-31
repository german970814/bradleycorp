import React from 'react'
import style from './SimpleSlider.scss'

const ButtonNext = props => {
  return (
    <div
      className={style.nextButton}>
      <span>
        {'Next'}
      </span>
      <img src={require('../../../images/icon-arrow/icon-arrow-r@2x.png')} />
    </div>

  )
}

export default ButtonNext
