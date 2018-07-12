// @flow
import * as React from 'react'
import Error from '../Error'

/**
 * A wrapper for the Error component
 * to be used when filtering or searching leads to no results.
 */

type Props = {
  message: string,
  className?: string,
  hideCTA?: boolean
}

class NoResults extends React.PureComponent<Props> {
  render () {
    return (
      <Error
        message={this.props.message}
        className={this.props.className}
        cta={!this.props.hideCTA ? 'Please Try Again' : undefined}
      />
    )
  }
}

export default NoResults
