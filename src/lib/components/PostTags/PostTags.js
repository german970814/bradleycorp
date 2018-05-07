// @flow
import React from 'react'
import type { WPPostTagTerm } from '../../types/term_types'
import { Link } from 'react-router-dom'
import { createArchiveUrl } from '../../bcorpUrl'
import style from './PostTags.scss'

type Props = {
  tags: Array<WPPostTagTerm>,
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
          <Link key={index} to={createArchiveUrl(tag) || '#'}>
            <div className={`post-tag ${style.tag}`}>{tag.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default PostTags
