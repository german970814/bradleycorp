// @flow
import * as React from 'react'
import type { Location } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

type Props = {
  location: Location,
  children: React.Node
}

class ScrollToTop extends React.Component<Props> {
  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
