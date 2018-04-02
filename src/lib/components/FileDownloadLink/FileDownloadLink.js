import React from 'react'
import PropTypes from 'prop-types'
import PDFDownloadLink from './PDFDownloadLink/PDFDownloadLink'
import WordDownloadLink from './WordDownloadLink/WordDownloadLink'
import style from './FileDownloadLink.scss'

/**
 * Takes a link to either a PDF or Word file and, depending on the file type,
 * returns a PDF or Word icon next to the title
 */
const FileDownloadLink = props => {
  switch (props.link.split('.').pop()) {
    case 'pdf':
      return (
        <PDFDownloadLink
          title={props.title}
          link={props.link}
          linkClass={props.linkClass}
          titleClass={props.titleClass}
          iconClass={props.iconClass}
        />
      )

    case 'doc':
    case 'docx':
    case 'docm':
    case 'docb':
      return (
        <WordDownloadLink
          title={props.title}
          link={props.link}
          linkClass={props.linkClass}
          titleClass={props.titleClass}
          iconClass={props.iconClass}
        />
      )

    default:
      return (
        <span
          className={[style.title, style.noLink, props.titleClass].join(' ')}>
          {props.title}
        </span>
      )
  }
}

FileDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  /**
   * Link to file, either PDF or Word
   */
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string,
  linkClass: PropTypes.string
}

export default FileDownloadLink
