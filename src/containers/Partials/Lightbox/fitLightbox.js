import React, { Component } from 'react'
import debounce from 'debounce'
import LIGHTBOXSIZES from './lightboxVars'

const fitLightbox = (WrappedComponent, fixedRatio) => {
  return class FitLightbox extends Component {
    constructor (props) {
      super(props)
      this.state = { width: '0', height: '0' }
      this.updateWindowDimensions = debounce(this.updateWindowDimensions.bind(this), 200)
    }

    componentDidMount () {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions () {
      this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    getLightboxHeight () {
      return (LIGHTBOXSIZES.height * this.state.height) - (LIGHTBOXSIZES.closeButtonHeight * 2) - LIGHTBOXSIZES.closeButtonDistanceBelow
    }

    getHeightAndWidthForFixedRatio () {
      let height = this.getLightboxHeight()
      let width = height * (1 / fixedRatio) // youtube aspect ratio

      if (width > this.state.width) {
        width = LIGHTBOXSIZES.width * this.state.width
        height = width * fixedRatio // youtube aspect ratio
      }

      return { height, width }
    }

    getDimensions () {
      if (fixedRatio) {
        return this.getHeightAndWidthForFixedRatio()
      }
      return {
        height: this.getLightboxHeight(),
        width: LIGHTBOXSIZES.width * this.state.width
      }
    }

    render () {
      const dims = this.getDimensions()

      const margin = (this.getLightboxHeight() - dims.height) / 2

      const newProps = {
        style: {
          height: dims.height,
          width: dims.width
        }
      }

      const containerStyle = {
        marginTop: `${margin}px`,
        marginBottom: `${margin}px`
      }

      return (
        <div
          style={containerStyle}>
          <WrappedComponent {...newProps} {...this.props} />
        </div>
      )
    }
  }
}

export default fitLightbox
