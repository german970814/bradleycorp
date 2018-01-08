import React from 'react'
import VerticalAlignHelper from '../../../../../../../components/Partials/VerticalAlignHelper/VerticalAlignHelper'
import style from './SelectedImageLightboxContent.scss'

const ButtonRight = props => {
  return (
    <div
      className={style.buttonRight} >
      <VerticalAlignHelper />
      <img
        src={require('../../../../../../../images/icon-arrow/icon-arrow-r@2x.png')} />
    </div>
  )
}

export default ButtonRight
