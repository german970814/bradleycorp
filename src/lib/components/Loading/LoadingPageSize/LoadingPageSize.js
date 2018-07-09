// @flow
import * as React from 'react'
import Loading from '../Loading'

type Props = {}

/**
 * This is literally just a wrapper for Loading to add the pageSize prop.
 * Makes it a lot easier for us in the router when adding it to Loadable
 */

class LoadingPageSize extends React.PureComponent<Props> {
  render () {
    return <Loading pageSize />
  }
}

export default LoadingPageSize
