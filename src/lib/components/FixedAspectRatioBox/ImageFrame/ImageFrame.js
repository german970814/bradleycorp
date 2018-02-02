import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import FixedAspectRatioBox from '../FixedAspectRatioBox'
import style from './ImageFrame.scss'

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

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            // mobile
            <FixedAspectRatioBox
              aspectRatio={this.props.aspectRatio} >
              <div
                style={{
                  backgroundImage: `url(${this.props.src})`,
                  backgroundSize: this.props.sizing
                }}
                className={style.image} />
            </FixedAspectRatioBox>
          ) : (
            <Media query={{ maxWidth: TABLETMAXWIDTH }}>
              {match =>
                match ? (
                // tablet
                  <FixedAspectRatioBox
                    aspectRatio={this.getAspectRatioTablet()} >
                    <div
                      style={{
                        backgroundImage: `url(${this.props.src})`,
                        backgroundSize: this.props.sizing
                      }}
                      className={style.image} />
                  </FixedAspectRatioBox>
                ) : (
                // desktop
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
            </Media>
          )
        }
      </Media>
    )
  }
}

ImageFrame.propTypes = {
  src: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  aspectRatioTablet: PropTypes.number,
  aspectRatioDesktop: PropTypes.number,
  sizing: PropTypes.oneOf(['cover', 'contain'])
}

ImageFrame.defaultProps = {
  sizing: 'cover'
}

export default ImageFrame
