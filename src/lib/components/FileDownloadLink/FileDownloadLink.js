import React from 'react'
import PropTypes from 'prop-types'
import PDFDownloadLink from './PDFDownloadLink/PDFDownloadLink'
import WordDownloadLink from './WordDownloadLink/WordDownloadLink'
// import style from './FileDownloadLink.scss'

/**
 * Takes a link and, depending on the file type,
 * returns a PDF or Word icon next to the title.
 *
 * Default (including media manager links) will be rendered with a PDF icon.
 */

const FileDownloadLink = props => {
  switch (props.link.split('.').pop()) {
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

    case 'pdf':
    default:
      return (
        <PDFDownloadLink
          title={props.title}
          link={props.link}
          linkClass={props.linkClass}
          titleClass={props.titleClass}
          iconClass={props.iconClass}
        />
      )

    /*
      return (
        <a href={props.link} target="_blank">
          <div
            className={[
              style.title,
              style.link,
              style.noLink,
              props.titleClass
            ].join(' ')}>
            {props.title}
          </div>
        </a>
      )
      */
  }
}

FileDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  /**
   * Link to file, either PDF, Word or media manager
   */
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string,
  linkClass: PropTypes.string
}

export default FileDownloadLink
