import React from 'react'
import VerticalAlignHelper from '../../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './ProductContentImagesDesktop.scss'

const ButtonUp = props => {
  return (
    <div
      className={style.buttonUp} >
      <VerticalAlignHelper />
      <img
        src={require('../../../../../../../images/icon-arrow/icon-arrow-up@2x.png')} />
    </div>
  )
}

export default ButtonUp
