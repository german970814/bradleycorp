import React from 'react'
import PropTypes from 'prop-types'
import sharedStyle from '../FileDownloadLink.scss'

const PDFDownloadLink = props => {
  return (
    <div className={sharedStyle.container}>
      <a href={props.link} target="_blank">
        <div className={sharedStyle.wrapper}>
          <div className={sharedStyle.iconWrapper}>
            <img
              className={[sharedStyle.icon, props.iconClass].join(' ')}
              src={require('../../../../images/pdf-icon/pdf@2x.png')}
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

PDFDownloadLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  titleClass: PropTypes.string,
  iconClass: PropTypes.string
}

export default PDFDownloadLink
