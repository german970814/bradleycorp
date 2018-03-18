import React from 'react'
import style from './SimpleSlider.scss'

const ButtonPrev = props => {
  return (
    <div
      className={style.prevButton}>
      <img src={require('../../../images/icon-arrow/icon-arrow-l@2x.png')} />
      <div className={'small-body'}>
        {'Prev'}
      </div>
    </div>
  )
}

export default ButtonPrev
