import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SimpleSlider from '../SimpleSlider'
import style from './SimpleSliderLightbox.scss'

class SimpleSliderLightbox extends Component {
  getChildrenWithRegulatedHeight () {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        height: this.props.lightboxSize.height
      })
    })
  }

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
          nextPrevButtonsForMobile={false}
          desktopWrapperClassName={style.lightboxWrapper}
          ulClassName={style.lightboxUlClassName}
          listItemClassName={style.lightboxListItem} >
          {this.getChildrenWithRegulatedHeight()}
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
  lightboxSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func
}

export default SimpleSliderLightbox
