import React from 'react'
import VerticalAlignHelper from '../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './ProductContentImagesDesktop.scss'

const ButtonDown = props => {
  return (
    <div
      className={style.buttonDown} >
      <VerticalAlignHelper />
      <img
        src={require('../../../../../../images/icon-arrow/icon-arrow-down@2x.png')} />
    </div>
  )
}

export default ButtonDown
