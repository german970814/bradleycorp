import React from 'react'
import PropTypes from 'prop-types'
import style from './ArrowThumbnail.scss'

const ArrowThumbnail = props => {
  return (
    <div
      className={`arrow-thumbnail ${props.customClass}`} >

      <div
        className={style.wrapper}>

        <div
          className={style.arrowWrapper}>
          <img
            src={require('../../../images/small-arrow/small-arrow@2x.png')}
            className={[style.arrow, props.arrowCustomClass].join(' ')} />
        </div>

        <div
          className={style.wrapChildren} >
          {props.children}
        </div>

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
