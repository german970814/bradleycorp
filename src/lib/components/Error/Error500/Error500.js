// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import Error from '../Error'

type Props = {}

class Error500 extends React.PureComponent<Props> {
  render () {
    return (
      <Error
        message={'Oops! Something Went Wrong.'}
        cta={'Please Try Again'}
        pageSize
      />
    )
  }
}

export default Error500
