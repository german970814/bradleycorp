// @flow
import * as React from 'react'
import type { OptionsType } from '../../contexts/OptionsContext'
import { Helmet } from 'react-helmet'
import { withOptions } from '../../contexts/OptionsContext'
import { cleanMetaDescription } from '../../bcorpString'

/**
 * A wrapper for react-helmet,
 * which manages the HTML document head.
 *
 * @see https://github.com/nfl/react-helmet
 */

type Props = {
  /**
   * Prefixed and passed to the <title> tags in the head
   */
  title: string,
  /**
   * Cleaned and prepared and passed to the description meta tag
   */
  description: string,
  // from withOptions HOC
  options: OptionsType
}

class BCorpHead extends React.PureComponent<Props> {
  render () {
    const titlePrefix = this.props.options.blogname || 'BradleyCorp'
    const title = `${titlePrefix} - ${this.props.title}`

    return (
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={cleanMetaDescription(this.props.description)}
        />
      </Helmet>
    )
  }
}

export default withOptions(BCorpHead)
