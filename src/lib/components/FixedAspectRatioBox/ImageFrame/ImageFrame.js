import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import ContainerMediaQuery from '../../../containers/ContainerMediaQuery/ContainerMediaQuery'
import FixedAspectRatioBox from '../FixedAspectRatioBox'
import style from './ImageFrame.scss'

class ImageFrame extends Component {
  constructor (props) {
    super(props)

    this.state = {
      node: undefined
    }
  }

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
      <FixedAspectRatioBox
        aspectRatio={this.props.aspectRatio} >
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image} />
      </FixedAspectRatioBox>
    )
  }

  renderFrameTablet () {
    return (
      <FixedAspectRatioBox
        aspectRatio={this.getAspectRatioTablet()} >
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image} />
      </FixedAspectRatioBox>
    )
  }

  renderFrameDesktop () {
    return (
      <FixedAspectRatioBox
        aspectRatio={this.getAspectRatioDesktop()} >
        <div
          style={{
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: this.props.sizing
          }}
          className={style.image} />
      </FixedAspectRatioBox>
    )
  }

  render () {
    if (!this.props.respondToContainer) {
      return (
        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match ? this.renderFrameMobile()
              : (
                <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                  {match =>
                    match ? this.renderFrameTablet() : this.renderFrameDesktop()
                  }
                </Media>
              )
          }
        </Media>
      )
    } else {
      return (
        <ContainerMediaQuery
          node={this.props.containerNode || this.state.node} >
          {(containerClassName, size) => {
            let frame = null

            if (size === 'mobile') {
              frame = this.renderFrameMobile()
            } else

            if (size === 'tablet') {
              frame = this.renderFrameTablet()
            } else

            if (size === 'desktop') {
              frame = this.renderFrameDesktop()
            }

            return (
              <div
                ref={(node) => {
                  if (!this.props.containerNode && !this.state.node) {
                    this.setState({ node })
                  }
                }}
                className={`${containerClassName} ${style.imageFrame}`} >

                {frame}

              </div>
            )
          }}
        </ContainerMediaQuery>
      )
    }
  }
}

ImageFrame.propTypes = {
  src: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  aspectRatioTablet: PropTypes.number,
  aspectRatioDesktop: PropTypes.number,
  /**
   * Media query is on container size rather than window
   */
  respondToContainer: PropTypes.bool,
  /**
   * We can give the slider another DOM a different node to respond to if respondToContainer is true
   * eg we might pick a higher level parent that still isnt the whole window
   *
   * If left empty the slider will respond to the size of its' container
   */
  containerNode: PropTypes.object,
  sizing: PropTypes.oneOf(['cover', 'contain'])
}

ImageFrame.defaultProps = {
  sizing: 'cover'
}

export default ImageFrame
