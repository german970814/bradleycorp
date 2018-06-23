// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import BCorpHead from '../../BCorpHead/BCorpHead'
import Error from '../Error'

type Props = {}

const pageTitle = 'Error'
const pageDescription = ''

class Error500 extends React.PureComponent<Props> {
  render () {
    return (
      <React.Fragment>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <Error
          message={'Oops! Something Went Wrong.'}
          cta={'Please Try Again'}
          pageSize
        />
      </React.Fragment>
    )
  }
}

export default Error500
