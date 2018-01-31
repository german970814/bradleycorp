import React from 'react'
import VerticalAlignHelper from '../../../components/VerticalAlignHelper/VerticalAlignHelper'
import ScrollableList from '../ScrollableList'
import Lightbox from '../../Lightbox/Lightbox'
import style from './ScrollableListOpensInLightbox.scss'

/**
 * A Scrollable List that opens a copy of the scroller in a lightbox when any of the elements are clicked
 *
 * @extends ScrollableList
 */
class ScrollableListOpensInLightbox extends ScrollableList {
  // ScrollableListOpensInLightbox expects children to be a collection of elements like below:
  // Two elements wrapped in a React Fragment
  //
  // <React.Fragment>
  //
  //  child to display outside of Lightbox
  //  <Element 1 />
  //
  //  child to display inside Lightbox
  //  <Element 2 />
  //
  // </React.Fragment>
  //
  render () {
    return (
      <Lightbox>

        {super.render()}

        <div className={style.scrollableListOpensInLightbox}>
          <VerticalAlignHelper />
          {super.render()}
        </div>

      </Lightbox>
    )
  }
}

export default ScrollableListOpensInLightbox
