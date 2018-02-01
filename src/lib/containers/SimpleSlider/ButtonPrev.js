import React from 'react'
import style from './SimpleSlider.scss'

const ButtonPrev = props => {
  return (
    <div
      className={style.prevButton}>
      <img src={require('../../../images/icon-arrow/icon-arrow-l@2x.png')} />
      <h6>
        {'Prev'}
      </h6>
    </div>
  )
}

export default ButtonPrev
