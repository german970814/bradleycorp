// @flow
import * as React from 'react'
import type { Location } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

/**
 * Put this anywhere inside a React-Router
 * to make sure the window scrolls to the top whenever the location updates.
 */

type Props = {
  location: Location,
  children: React.Node
}

class ScrollToTop extends React.Component<Props> {
  componentDidUpdate (prevProps) {
    // Scroll to top when location changes,
    // but only if the pathname doesnt include pagination.
    //
    // This stops the window from scrolling to the top
    // when we click a 'Load More'
    if (
      this.props.location !== prevProps.location &&
      this.props.location.pathname.indexOf('/page=') === -1
    ) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
