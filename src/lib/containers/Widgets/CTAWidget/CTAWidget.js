// @flow
import React, { Component } from 'react'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'
import BCorpWidget from '../BCorpWidget'
import style from './CTAWidget.scss'

type Props = {
  title: string,
  text?: string,
  link?: string,
  linkText?: string,
  mediaSrc?: string
}

/**
 * The CTA Widget
 */
class CTAWidget extends Component<Props> {
  renderMedia () {
    return null
  }

  renderText () {
    const { text } = this.props

    if (!text) {
      return
    }

    return <div className={style.text}>{text}</div>
  }

  renderButton () {
    const { link, linkText } = this.props

    if (!link) {
      return
    }

    return (
      <div className={style.button}>
        <ArrowButton text={linkText || ''} link={link} />
      </div>
    )
  }

  render () {
    return (
      <BCorpWidget title={this.props.title}>
        {this.renderMedia()}
        {this.renderText()}
        {this.renderButton()}
      </BCorpWidget>
    )
  }
}

export default CTAWidget
