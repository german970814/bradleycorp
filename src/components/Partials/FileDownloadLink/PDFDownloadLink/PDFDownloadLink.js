import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const PDFDownloadLink = props => {
  return (
    <div
      className={sharedStyle.container} >
      <a href={props.link}>
        <img
          className={[sharedStyle.icon, props.iconClass].join(' ')}
          src={require('../../../../images/pdf-icon/pdf@2x.png')} />
        <span
          className={[sharedStyle.title, props.titleClass].join(' ')} >
          {props.title}
        </span>
      </a>
    </div>
  )
}

PDFDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string
}

export default PDFDownloadLink
