import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SimpleSlider from '../SimpleSlider'
import style from './SimpleSliderLightbox.scss'

class SimpleSliderLightbox extends Component {
  render () {
    const LightboxCloseButton = this.props.lightboxCloseButton

    return (
      <div
        className={style.lightboxContentWrapper} >

        <SimpleSlider
          title={''}
          numberMobile={1}
          numberTablet={1}
          numberDesktop={1}
          desktopWrapperClassName={style.lightboxWrapper}
          ulClassName={style.lightboxUlClassName}
          listItemClassName={style.lightboxListItem} >
          {this.props.children}
        </SimpleSlider>

        <LightboxCloseButton
          onClick={this.props.lightboxCloseButtonOnClick} />

      </div>
    )
  }
}

SimpleSliderLightbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func
}

export default SimpleSliderLightbox
