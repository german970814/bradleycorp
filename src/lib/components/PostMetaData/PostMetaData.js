// @flow
import React from 'react'
import moment from 'moment'
import style from './PostMetaData.scss'

/**
 * Displays extra post info such as author and date posted.
 * Can choose between two possible formats for the data.
 */

type Props = {
  authorName?: string,
  /**
   * Date in desired format as string
   */
  date?: string,
  className?: string,
  /**
   * format 1: 'Posted by Author on Date'
   * format 2: 'by Author posted on Date'
   * @type {[type]}
   */
  format: 1 | 2
}

const PostMetaData = (props: Props) => {
  if (!props.authorName && !props.date) {
    return null
  }

  const authorInfo = props.authorName
    ? getAuthorNameByFormat(props.authorName, props.format)
    : ''

  let dateInfo = ''
  if (props.date) {
    const date = new Date(props.date.replace(/-/g, '/'))
    const prettyDate: string = moment(date).format('MMMM Do YYYY, h:mm a')
    dateInfo = props.date ? getDateByFormat(prettyDate, props.format) : ''
  }

  return (
    <div
      className={`post-meta-data ${style.postMeta} ${props.className || ''}`}>
      {`${authorInfo} ${dateInfo}`}
    </div>
  )
}

function getAuthorNameByFormat (authorName: string, format: 1 | 2): string {
  if (format === 1) {
    return `Posted by ${authorName}`
  } else if (format === 2) {
    return `by ${authorName}`
  }
  return ''
}

function getDateByFormat (prettyDate: string, format: 1 | 2): string {
  if (format === 1) {
    return `on ${prettyDate}`
  } else if (format === 2) {
    return `posted on ${prettyDate}`
  }
  return ''
}

export default PostMetaData
