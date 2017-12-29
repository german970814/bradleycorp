import React from 'react'
import PropTypes from 'prop-types'
import PDFDownloadLink from './PDFDownloadLink/PDFDownloadLink'
import WordDownloadLink from './WordDownloadLink/WordDownloadLink'
import style from './FileDownloadLink.scss'

const FileDownloadLink = props => {
  console.log(props.link.split('.').pop())

  switch (props.link.split('.').pop()) {
    case 'pdf':
      return (
        <PDFDownloadLink
          title={props.title}
          link={props.link} />
      )

    case 'doc':
    case 'docx':
    case 'docm':
    case 'docb':
      return (
        <WordDownloadLink
          title={props.title}
          link={props.link} />
      )

    default:
      return (
        <span
          className={[style.title, style.noLink].join(' ')}>
          {props.title}
        </span>
      )
  }
}

FileDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default FileDownloadLink
