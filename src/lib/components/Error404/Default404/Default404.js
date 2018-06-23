// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import Error404 from '../Error404'

type Props = {}

class Default404 extends React.PureComponent<Props> {
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
      <Error404
        message={'404 Error: Page Not Found'}
        messageSecondary={this.renderMessageSecondary()}
        cta={'Return To The Bradley Home Page'}
        ctaLink={'/'}
      />
    )
  }
}

export default Default404
