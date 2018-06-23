// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import BCorpHead from '../../BCorpHead/BCorpHead'
import Error from '../Error'

type Props = {}

const pageTitle = 'Error'
const pageDescription = ''

class Error404 extends React.PureComponent<Props> {
  renderMessageSecondary () {
    return (
      <div>
        {
          'Oops! That didn’t work right. Sorry about that! Maybe try searching for what you want? Otherwise, '
        }
        <Link to="/products">{'products'}</Link>
        {', '}
        <Link to="/services">{'services'}</Link>
        {', and '}
        <Link to="/about">{'about us'}</Link>
        {' are good places to find information. '}
      </div>
    )
  }

  render () {
    return (
      <React.Fragment>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <Error
          message={'404 Error: Page Not Found'}
          messageSecondary={this.renderMessageSecondary()}
          cta={'Return To The Bradley Home Page'}
          ctaLink={'/'}
          pageSize
        />
      </React.Fragment>
    )
  }
}

export default Error404
