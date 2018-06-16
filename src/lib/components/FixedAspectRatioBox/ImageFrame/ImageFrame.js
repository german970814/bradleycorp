import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import ContainerMediaQuery from '../../../containers/ContainerMediaQuery/ContainerMediaQuery'
import FixedAspectRatioBox from '../FixedAspectRatioBox'
import style from './ImageFrame.scss'

/**
 * Wrapper for FixedAspectRatioBox which takes
 * an image src and allows you to specify a different aspect ratio for each screen size
 */
class ImageFrame extends Component {
  getAspectRatioTablet () {
    if (!this.props.aspectRatioTablet) {
      return this.props.aspectRatio
    }

    return this.props.aspectRatioTablet
  }

  getAspectRatioDesktop () {
    if (!this.props.aspectRatioDesktop) {
      return this.props.aspectRatio
    }

    return this.props.aspectRatioDesktop
  }

  renderFrameMobile () {
    return (
      <FixedAspectRatioBox aspectRatio={this.props.aspectRatio}>
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image}
        />
      </FixedAspectRatioBox>
    )
  }

  renderFrameTablet () {
    return (
      <FixedAspectRatioBox aspectRatio={this.getAspectRatioTablet()}>
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image}
        />
      </FixedAspectRatioBox>
    )
  }

  renderFrameDesktop () {
    return (
      <FixedAspectRatioBox aspectRatio={this.getAspectRatioDesktop()}>
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image}
        />
      </FixedAspectRatioBox>
    )
  }

  render () {
    if (!this.props.respondToContainer) {
      return this.props.screenSize === 'mobile'
        ? this.renderFrameMobile()
        : this.props.screenSize === 'tablet'
          ? this.renderFrameTablet()
          : this.renderFrameDesktop()
    } else {
      return (
        <div
          ref={node => {
            if (!this.props.containerNode && !this.node) {
              this.node = node
            }
          }}
          className={style.imageFrame}>
          <ContainerMediaQuery node={this.props.containerNode || this.node}>
            {(containerClassName, size) => {
              let frame = null

              if (size === 'mobile') {
                frame = this.renderFrameMobile()
              } else if (size === 'tablet') {
                frame = this.renderFrameTablet()
              } else if (size === 'desktop') {
                frame = this.renderFrameDesktop()
              }

              return <div className={containerClassName}>{frame}</div>
            }}
          </ContainerMediaQuery>
        </div>
      )
    }
  }
}

ImageFrame.propTypes = {
  /**
   * Src of an image to contain in the frame
   */
  src: PropTypes.string.isRequired,
  /**
   * Aspect ratio for mobile screen size
   */
  aspectRatio: PropTypes.number.isRequired,
  /**
   * Aspect ratio for tablet screen size (defaults to mobile)
   */
  aspectRatioTablet: PropTypes.number,
  /**
   * Aspect ratio for desktop screen size (defaults to mobile)
   */
  aspectRatioDesktop: PropTypes.number,
  /**
   * Media query will be on container size rather than window
   */
  respondToContainer: PropTypes.bool,
  /**
   * We can give the slider another DOM a different node to respond to if respondToContainer is true
   * eg we might pick a higher level parent that still isnt the whole window
   *
   * If left empty the slider will respond to the size of its' container
   */
  containerNode: PropTypes.object,
  /**
   * How should the image fit inside the frame
   */
  sizing: PropTypes.oneOf(['cover', 'contain']),
  screenSize: PropTypes.string
}

ImageFrame.defaultProps = {
  sizing: 'cover'
}

export default withScreenSize(ImageFrame)
