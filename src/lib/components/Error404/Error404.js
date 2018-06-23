// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import BCorpLink from '../BCorpLink/BCorpLink'
import ContentTransformer from '../ContentTransformer/ContentTransformer'
import style from './Error404.scss'

type Props = {
  message: string,
  messageSecondary?: React.Node,
  cta?: string,
  ctaLink?: string,
  className?: string
}

class Error404 extends React.PureComponent<Props> {
  renderCTA () {
    if (!this.props.cta) {
      return null
    }

    return <h6>{this.props.cta}</h6>
  }

  render () {
    return (
      <div className={`row ${this.props.className || ''}`}>
        <div className={`col1 ${style.noResultsWrapper}`}>
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

export default Error404
