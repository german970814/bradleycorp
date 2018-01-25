import React from 'react'
import ScrollableList from '../ScrollableList'
import Lightbox from '../../Lightbox/Lightbox'

// ScrollableListOpensInLightbox expects children to be a collection of elements like below:
// Two elements wrapped in a React Fragment
//
// <React.Fragment>
//
// child to display outside of Lightbox
// <Element 1 />
//
// child to display inside Lightbox
// <Element 2 />
//
// </React.Fragment>
// 
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
