import React from 'react'
import PropTypes from 'prop-types'
import style from './ArrowThumbnail.scss'

/**
 * Displays children elements next to a bcorp small grey arrow thumbnail icon
 */
const ArrowThumbnail = props => {
  return (
    <div className={`arrow-thumbnail ${props.className}`}>
      <div className={style.wrapper}>
        <div className={style.arrowWrapper}>
          <img
            src={require('../../../images/small-arrow/small-arrow@2x.png')}
            className={`${style.arrow} ${props.arrowClassName}`}
          />
        </div>

        <div className={style.wrapChildren}>{props.children}</div>
      </div>
    </div>
  )
}

ArrowThumbnail.propTypes = {
  /**
   * The element that will be displayed next to the thumbnail. Can be anything but is usually a link.
   */
  children: PropTypes.object.isRequired,
  /**
   * Additional css classes
   */
  className: PropTypes.string,
  /**
   * Additional css classes for the arrow image
   */
  arrowClassName: PropTypes.string
}

export default ArrowThumbnail
