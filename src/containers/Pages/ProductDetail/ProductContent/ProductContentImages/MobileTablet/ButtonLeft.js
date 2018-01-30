import React from 'react'
import VerticalAlignHelper from '../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './ProductContentImagesMobileTablet.scss'

const ButtonLeft = props => {
  return (
    <div
      className={style.buttonLeft} >
      <VerticalAlignHelper />
      <img
        src={require('../../../../../../images/icon-arrow/icon-arrow-l@2x.png')} />
    </div>
  )
}

export default ButtonLeft
