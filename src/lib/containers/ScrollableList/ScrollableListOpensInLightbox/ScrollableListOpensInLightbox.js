import React from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../components/VerticalAlignHelper/VerticalAlignHelper'
import ScrollableList from '../ScrollableList'
import LightboxV2 from '../../Lightbox/LightboxV2/LightboxV2'
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
      <LightboxV2
        renderChildren={openLightbox => {
          return <div onClick={openLightbox}>{super.render()}</div>
        }}
        renderLightboxContents={() => {
          return (
            <div className={style.scrollableListOpensInLightbox}>
              <VerticalAlignHelper />
              {super.render()}
            </div>
          )
        }}
        onLightboxOpen={this.props.onLightboxOpen}
        onLightboxClose={this.props.onLightboxClose}
      />
    )
  }
}

ScrollableListOpensInLightbox.propTypes = {
  ...ScrollableList.propTypes,

  onLightboxOpen: PropTypes.func,
  onLightboxClose: PropTypes.func
}

export default ScrollableListOpensInLightbox
