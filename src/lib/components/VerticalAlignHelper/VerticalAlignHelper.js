import React from 'react'
import style from './VerticalAlignHelper.scss'

/**
 * A 'ghost' element with 100% height which helps with vertical align: middle
 */

export default function VerticalAlignHelper () {
  return <span className={style.vAlignHelper} />
}
