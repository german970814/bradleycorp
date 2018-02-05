import { Component } from 'react'
import PropTypes from 'prop-types'
import { removeHostFromUrl } from '../../bcorpUrl'

/**
 * Wrapper for react router Link components.
 * Allows us to check for an external link being passed and render a different component for each case
 *
 * eg we might pass an <a> tag to renderExternal and a <Link> tag to renderInternal
 */
class BCorpLink extends Component {
  /**
   * Checks if the link is internal
   *
   * If so it calls the renderInternal function prop passing it the react router friendly link with host removed,
   * otherwise it calls renderExternal and passes the full url
   *
   * @return {[void]} Calls render prop functions
   */
  render () {
    const internal = removeHostFromUrl(this.props.url)

    return internal ? this.props.renderInternal(internal) : this.props.renderExternal(this.props.url)
  }
}

BCorpLink.propTypes = {
  url: PropTypes.string.isRequired,
  renderInternal: PropTypes.func.isRequired,
  renderExternal: PropTypes.func.isRequired
}

export default BCorpLink
