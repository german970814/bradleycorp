// @flow
import * as React from 'react'
import Error from '../Error'

type Props = {
  message: string,
  className?: string
}

class NoResults extends React.PureComponent<Props> {
  render () {
    return (
      <Error
        message={this.props.message}
        className={this.props.className}
        cta={'Please Try Again'}
      />
    )
  }
}

export default NoResults
