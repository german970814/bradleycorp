// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import BCorpLink from '../BCorpLink/BCorpLink'
import style from './Error.scss'

/**
 * Renders a default Bradley error message
 * which can be customised with messages and a CTA.
 */

type Props = {
  /**
   * Main H1 message, eg 404, or Not Found.
   * @type {[type]}
   */
  message: string,
  /**
   * Option to add a bit more information about the error
   */
  messageSecondary?: React.Node,
  /**
   * Add a CTA below the messages to link back to a different page
   */
  cta?: string,
  ctaLink?: string,
  className?: string,
  /**
   * Without this the error message should fit well in most components,
   * this will add large top and bottom margins so the error message
   * fits the whole page
   */
  pageSize?: boolean
}

class Error extends React.PureComponent<Props> {
  renderCTA () {
    if (!this.props.cta) {
      return null
    }

    return <h6>{this.props.cta}</h6>
  }

  render () {
    return (
      <div className={`row ${this.props.className || ''}`}>
        <div
          className={`col1 ${style.errorWrapper} ${
            this.props.pageSize ? style.pageSize : ''
          }`}>
          <img src={require('../../../images/warning-icon/warning-icon.png')} />

          <h1>{this.props.message}</h1>

          {this.props.messageSecondary && (
            <div className={`404-message-secondary ${style.messageSecondary}`}>
              {this.props.messageSecondary}
            </div>
          )}

          {this.props.ctaLink ? (
            <BCorpLink
              url={this.props.ctaLink}
              renderInternal={url => {
                return <Link to={url}>{this.renderCTA()}</Link>
              }}
              renderExternal={url => {
                return (
                  <a href={url} target="_blank">
                    {this.renderCTA()}
                  </a>
                )
              }}
            />
          ) : (
            this.renderCTA()
          )}
        </div>
      </div>
    )
  }
}

export default Error
