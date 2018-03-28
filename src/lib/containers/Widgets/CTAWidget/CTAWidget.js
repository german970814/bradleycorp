import React from 'react'
import PropTypes from 'prop-types'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'
import BCorpWidget from '../BCorpWidget'
import style from './CTAWidget.scss'

/**
 * The CTA Widget
 *
 * @extends BCorpWidget
 */
class CTAWidget extends BCorpWidget {
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
      <div className={style.button} >
        <ArrowButton text={linkText} link={link} />
      </div>
    )
  }

  renderContentBox () {
    return (
      <React.Fragment>
        {this.renderMedia()}
        {this.renderText()}
        {this.renderButton()}
      </React.Fragment>
    )
  }

  render () {
    return super.render()
  }
}

CTAWidget.propTypes = {
  ...BCorpWidget.propTypes,

  text: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
  mediaSrc: PropTypes.string
}

export default CTAWidget
