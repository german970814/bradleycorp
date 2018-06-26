// @flow
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { METATITLEPREFIX } from '../../../globals'
import { cleanMetaDescription } from '../../bcorpString'

type Props = {
  title: string,
  description: string
}

class BCorpHead extends React.PureComponent<Props> {
  render () {
    return (
      <Helmet>
        <title>{`${METATITLEPREFIX}${this.props.title}`}</title>
        <meta
          name="description"
          content={cleanMetaDescription(this.props.description)}
        />
      </Helmet>
    )
  }
}

export default BCorpHead
