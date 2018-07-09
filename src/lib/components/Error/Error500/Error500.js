// @flow
import * as React from 'react'
import BCorpHead from '../../BCorpHead/BCorpHead'
import Error from '../Error'

/**
 * A wrapper for the Error component
 * to be used for 500 errors
 *
 * Note we update the HTML head, so this is best used for page components.
 */

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
