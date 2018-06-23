// @flow
import * as React from 'react'
import Error404 from '../Error404'

type Props = {
  message: string,
  className?: string
}

class NoResults extends React.PureComponent<Props> {
  render () {
    return (
      <Error404
        message={this.props.message}
        className={this.props.className}
        cta={'Please Try Again'}
      />
    )
  }
}

export default NoResults
