// @flow
import * as React from 'react'
import { removeHostFromUrl } from '../../bcorpUrl'

/**
 * Wrapper for react router Link components.
 * Allows us to check for an external link being passed
 * and render a different component for each case
 *
 * eg we might pass an <a> tag to renderExternal
 * and a <Link> tag to renderInternal
 */

type Props = {
  url: string,
  renderInternal: (url: string) => React.Node,
  renderExternal: (url: string) => React.Node
}

class BCorpLink extends React.Component<Props> {
  /**
   * Checks if the link is internal
   *
   * If so it calls the renderInternal function prop
   * passing it the react router friendly link with host removed,
   * otherwise it calls renderExternal and passes the full url
   */
  render () {
    const internal = removeHostFromUrl(this.props.url)

    return internal
      ? this.props.renderInternal(internal)
      : this.props.renderExternal(this.props.url)
  }
}

export default BCorpLink
