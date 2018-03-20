import React from 'react'
import PropTypes from 'prop-types'
import BCorpModule from '../BCorpModule'
import { Link } from 'react-router-dom'
import BCorpLink from '../../BCorpLink/BCorpLink'
import style from './CTAModule.scss'

class CTAModule extends BCorpModule {
  constructor (props) {
    super(props, style, 'CTAModule')
  }

  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h3 className={style.title}>{title}</h3>
  }

  renderMedia () {
    return null
  }

  renderText () {
    const { text } = this.props

    if (!text) {
      return
    }

    return <div
      className={style.text}
      dangerouslySetInnerHTML={{__html: decodeURIComponent(text)}}/>
  }

  renderButton () {
    const { link, linkText } = this.props

    if (!link || !linkText) {
      return
    }

    const button = <button className={style.button} >{linkText}</button>

    return (
      <BCorpLink
        url={link}
        renderInternal={url => {
          return (
            <Link to={url} replace >
              {button}
            </Link>
          )
        }}
        renderExternal={url => {
          return (
            <a href={url} >
              {button}
            </a>
          )
        }} />
    )
  }

  renderModule () {
    return (
      <div
        className={this.containerClassName} >

        {this.renderTitle()}
        {this.renderMedia()}
        {this.renderText()}
        {this.renderButton()}

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    const { title, text, link, linkText, mediaSrc } = this.props

    if (!title && !text && !link && !linkText && !mediaSrc) {
      return false
    }

    return true
  }
}

CTAModule.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
  mediaSrc: PropTypes.string
}

export default CTAModule
