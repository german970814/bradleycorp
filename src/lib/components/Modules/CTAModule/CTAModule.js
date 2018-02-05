import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BCorpLink from '../../BCorpLink/BCorpLink'
import style from './CTAModule.scss'

class CTAModule extends Component {
  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h5 className={style.title}>{title}</h5>
  }

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

  render () {
    return (
      <div className={style.CTAModule} >

        {this.renderTitle()}
        {this.renderMedia()}
        {this.renderText()}
        {this.renderButton()}

      </div>
    )
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
