import React from 'react'
import PropTypes from 'prop-types'
import BCorpModule from '../BCorpModule'
import BCorpBackground from '../../../components/BCorpBackground/BCorpBackground'
import style from './BackgroundImageModule.scss'

/**
 * Background Image Module Presentational Component
 *
 * @extends BCorpModule
 */
class BackgroundImageModule extends BCorpModule {
  constructor (props) {
    super(props, style, 'backgroundImageModule', 1)
  }

  renderImage () {
    return (
      <BCorpBackground
        imageSrc={this.props.background || ''}
        overlay={this.props.backgroundOverlay}
      />
    )
  }

  renderModule () {
    return <div className={this.containerClassName}>{this.renderImage()}</div>
  }

  render () {
    return super.render()
  }

  passesValidation () {
    return true
  }
}

BackgroundImageModule.propTypes = {
  ...BCorpModule.propTypes,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  backgroundOverlay: PropTypes.string
}

export default BackgroundImageModule
