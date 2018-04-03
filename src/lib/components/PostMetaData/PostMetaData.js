// @flow
import React from 'react'
import moment from 'moment'
import style from './PostMetaData.scss'

type Props = {
  authorName?: string,
  /**
   * Date in desired format as string
   */
  date?: string,
  className?: string
}

/**
 * Displays extra post info such as author and date posted.
 */
const PostMetaData = (props: Props) => {
  if (!props.authorName && !props.date) {
    return null
  }

  const authorInfo = props.authorName ? `by ${props.authorName}` : ''

  let dateInfo = ''
  if (props.date) {
    const date = new Date(props.date)
    const prettyDate = moment(date).format('MMMM Do YYYY, h:mm a')
    dateInfo = props.date ? `posted at ${prettyDate}` : ''
  }

  return (
    <div
      className={`post-meta-data ${style.postMeta} ${props.className || ''}`}>
      {`${authorInfo} ${dateInfo}`}
    </div>
  )
}

export default PostMetaData
