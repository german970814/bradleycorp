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
  constructor (props) {
    super(props)

    // bind it here so we create only one reference
    // and we can remove it from the event later on,
    // otherwise each time we open the lightbox a new listener is created.
    // @see https://gist.github.com/Restuta/e400a555ba24daa396cc
    this.onKeyDownBound = this.onKeyDown.bind(this)
  }
  /**
   * Allows us to scroll the lightboxed scrollable list with the keys
   */
  onKeyDown (e) {
    e.preventDefault()

    // left key
    if (e.keyCode === 37) {
      this.moveList(e, -1)
    }

    // right key
    if (e.keyCode === 39) {
      this.moveList(e, 1)
    }
  }

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
        onLightboxOpen={() => {
          document.addEventListener('keydown', this.onKeyDownBound)

          // run any additional callbacks
          this.props.onLightboxOpen && this.props.onLightboxOpen()
        }}
        onLightboxClose={() => {
          document.removeEventListener('keydown', this.onKeyDownBound)

          // run additional callbacks
          this.props.onLightboxClose && this.props.onLightboxClose()
        }}
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
