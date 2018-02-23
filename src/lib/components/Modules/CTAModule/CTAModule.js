import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BCorpLink from '../../BCorpLink/BCorpLink'
import ContainerMediaQuery from '../../../containers/ContainerMediaQuery/ContainerMediaQuery'
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

  render () {
    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={style.CTAModule} >

        <ContainerMediaQuery
          node={this.node} >
          {(containerClassName) => {
            return (
              <div
                className={containerClassName} >

                {this.renderTitle()}
                {this.renderMedia()}
                {this.renderText()}
                {this.renderButton()}

              </div>
            )
          }}
        </ContainerMediaQuery>

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
