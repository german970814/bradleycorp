// @flow
import React from 'react'
import type { WPPostTag } from '../../types/post_types'
import style from './PostTags.scss'

type Props = {
  tags: Array<WPPostTag>,
  className: string
}

const PostTags = (props: Props) => {
  if (!props.tags || !props.tags.length) {
    return null
  }

  return (
    <div className={`${style.postTags} ${props.className || ''}`}>
      {props.tags.map((tag, index) => {
        return (
          <div key={index} className={`post-tag ${style.tag}`}>
            {tag.name}
          </div>
        )
      })}
    </div>
  )
}

export default PostTags
