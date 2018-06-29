import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'
import style from './CADDownloadLink.scss'

const CADDownloadLink = props => {
  return (
    <div className={sharedStyle.container}>
      <a href={props.link} target="_blank">
        <div className={sharedStyle.wrapper}>
          <div className={[sharedStyle.iconWrapper, style.iconWrapper].join(' ')}>
            <img
              className={[sharedStyle.icon, props.iconClass].join(' ')}
              src={require('../../../../images/cad-icon/cad@2x.png')}
            />
          </div>

          <span className={[sharedStyle.title, props.titleClass].join(' ')}>
            {props.title}
          </span>
        </div>
      </a>
    </div>
  )
}

CADDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string
}

export default CADDownloadLink
