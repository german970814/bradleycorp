// @flow
import * as React from 'react'
import style from './ArrowThumbnail.scss'

/**
 * Displays children elements next to a bcorp small grey arrow thumbnail icon
 */

type Props = {
  /**
   * The element that will be displayed next to the thumbnail. Can be anything but is usually a link.
   */
  children: React.Node,
  /**
   * Additional css classes
   */
  className?: string,
  /**
   * Additional css classes for the arrow image
   */
  arrowClassName?: string
}

const ArrowThumbnail = (props: Props) => {
  return (
    <div className={`arrow-thumbnail ${props.className || ''}`}>
      <div className={style.wrapper}>
        <div className={style.arrowWrapper}>
          <img
            src={require('../../../images/small-arrow/small-arrow@2x.png')}
            className={`${style.arrow} ${props.arrowClassName || ''}`}
          />
        </div>

        <div className={style.wrapChildren}>{props.children}</div>
      </div>
    </div>
  )
}

export default ArrowThumbnail
