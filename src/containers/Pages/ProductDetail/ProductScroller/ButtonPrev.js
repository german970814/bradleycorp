import React from 'react'
import style from './ProductScroller.scss'

const ButtonPrev = props => {
  return (
    <div
      className={style.prevButton}>
      <img src={require('../../../../images/icon-arrow/icon-arrow-l@2x.png')} />
      <span>
        {'Prev'}
      </span>
    </div>
  )
}

export default ButtonPrev
