import React from 'react'
import PropTypes from 'prop-types'
import BCorpModule from '../../../../../../lib/components/Modules/BCorpModule'
import style from './TextWithBackgroundPeelerModule.scss'

class TextWithBackgroundPeelerModule extends BCorpModule {
  constructor (props) {
    super(props, style, 'textWithBackgroundPeelerModule')
  }

  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h4 className={style.title} >{title}</h4>
  }

  renderText () {
    const { text } = this.props

    if (!text) {
      return
    }

    return <div className={style.text} >{text}</div>
  }

  renderTexture () {
    if (!this.props.backgroundPeeler) {
      return
    }

    const image = `url(${this.props.backgroundPeeler})`
    const hasCustomBackground = this.props.background ? style.hasCustomBackground : undefined

    return (
      <div
        style = {{
          backgroundImage: image
        }}
        className={`${style.texture} ${hasCustomBackground}`} />
    )
  }

  getBackground () {
    if (this.props.background) {
      return `url(${this.props.background})`
    } else {
      return undefined
    }
  }

  renderModule () {
    return (
      <div
        style={{
          backgroundImage: this.getBackground()
        }}
        className={this.containerClassName}>

        {this.renderTitle()}

        {this.renderText()}

        {this.renderTexture()}

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    const { title, text, background, backgroundPeeler } = this.props

    if (!title && !text && !background && !backgroundPeeler) {
      return false
    }

    return true
  }
}

TextWithBackgroundPeelerModule.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  background: PropTypes.string,
  backgroundPeeler: PropTypes.string,
  skin: PropTypes.string
}

export default TextWithBackgroundPeelerModule
