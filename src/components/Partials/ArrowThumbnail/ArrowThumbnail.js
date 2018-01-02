import React from 'react'
import PropTypes from 'prop-types'
import style from './ArrowThumbnail.scss'

const ArrowThumbnail = props => {
  return (
    <div
      className={[style.arrowThumbnail, props.customClass].join(' ')} >

      <img
        src={require('../../../images/icon-arrow/icon-arrow-r.png')}
        className={[style.arrow, props.arrowCustomClass].join(' ')} />

      <div
        className={style.wrapChildren}>
        {props.children}
      </div>

    </div>
  )
}

ArrowThumbnail.propTypes = {
  children: PropTypes.object.isRequired,
  customClass: PropTypes.string,
  arrowCustomClass: PropTypes.string
}

export default ArrowThumbnail
