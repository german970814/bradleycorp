import React from 'react'
import ScrollableList from './ScrollableList'
import Lightbox from '../Lightbox/Lightbox'

class ScrollableListOpensInLightbox extends ScrollableList {
  render () {
    return (
      <Lightbox>

        {super.render()}

        {super.render()}

      </Lightbox>
    )
  }
}

export default ScrollableListOpensInLightbox
