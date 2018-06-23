// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import Error from '../Error'

type Props = {}

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
      <Error
        message={'404 Error: Page Not Found'}
        messageSecondary={this.renderMessageSecondary()}
        cta={'Return To The Bradley Home Page'}
        ctaLink={'/'}
        pageSize
      />
    )
  }
}

export default Error404
