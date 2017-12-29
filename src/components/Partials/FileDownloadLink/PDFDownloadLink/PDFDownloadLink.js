import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const PDFDownloadLink = props => {
  return (
    <div
      className={sharedStyle.container} >
      <a href={props.link}>
        <img
          className={sharedStyle.icon}
          src={require('../../../../images/pdf-icon/pdf@2x.png')} />
        <span
          className={sharedStyle.title} >
          {props.title}
        </span>
      </a>
    </div>
  )
}

PDFDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default PDFDownloadLink
