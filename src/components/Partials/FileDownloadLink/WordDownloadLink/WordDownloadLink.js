import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const WordDownloadLink = props => {
  return (
    <div
      className={sharedStyle.container} >
      <a href={props.link}>
        <img
          className={sharedStyle.icon}
          src={require('../../../../images/word-icon/word@2x.png')} />
        <span
          className={sharedStyle.title}>
          {props.title}
        </span>
      </a>
    </div>
  )
}

WordDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default WordDownloadLink
