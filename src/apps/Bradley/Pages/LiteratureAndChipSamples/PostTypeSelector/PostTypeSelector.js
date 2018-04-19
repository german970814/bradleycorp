// @flow
import React from 'react'
import type { PostTypeOptions } from '../LiteratureAndChipSamples'
import style from './PostTypeSelector.scss'

type Props = {
  selected: PostTypeOptions,
  updateSelected: (newSelected: PostTypeOptions) => void
}

const PostTypeSelector = (props: Props) => {
  const literatureActive = props.selected === 'literature' ? style.active : ''
  const chipSamplesActive = props.selected === 'chip' ? style.active : ''

  return (
    <div className={`row ${style.postTypeSelector}`}>
      <div
        onClick={() => props.updateSelected('literature')}
        className={`col2 ${style.postTypeSelectButton} ${literatureActive}`}>
        <h6>{'LITERATURE'}</h6>
      </div>
      <div
        onClick={() => props.updateSelected('chip')}
        className={`col2 ${style.postTypeSelectButton} ${chipSamplesActive}`}>
        <h6>{'CHIP SAMPLES'}</h6>
      </div>
    </div>
  )
}

export default PostTypeSelector
