import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const WordDownloadLink = props => {
  return (
    <div className={sharedStyle.container}>
      <a href={props.link} target="_blank">
        <div className={sharedStyle.wrapper}>
          <div className={sharedStyle.iconWrapper}>
            <img
              className={[sharedStyle.icon, props.iconClass].join(' ')}
              src={require('../../../../images/word-icon/word@2x.png')}
            />
          </div>

          <div
            className={[
              sharedStyle.link,
              sharedStyle.title,
              props.titleClass
            ].join(' ')}>
            {props.title}
          </div>
        </div>
      </a>
    </div>
  )
}

WordDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string
}

export default WordDownloadLink
