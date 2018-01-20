import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const WordDownloadLink = props => {
  return (
    <div
      className={sharedStyle.container} >
<<<<<<< HEAD
      <a href={props.link}>

        <div
          className={sharedStyle.wrapper}>

          <div
            className={sharedStyle.iconWrapper}>
            <img
              className={[sharedStyle.icon, props.iconClass].join(' ')}
              src={require('../../../../images/word-icon/word@2x.png')} />
          </div>

          <span
            className={[sharedStyle.title, props.titleClass].join(' ')} >
            {props.title}
          </span>

        </div>

=======
      <a href={props.link}
        className={props.linkClass}>
        <img
          className={[sharedStyle.icon, props.iconClass].join(' ')}
          src={require('../../../../images/word-icon/word@2x.png')} />
        <span
          className={[sharedStyle.title, props.titleClass].join(' ')}>
          <span>{props.title}</span>
        </span>
>>>>>>> origin/roami
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
