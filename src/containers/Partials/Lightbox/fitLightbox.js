import React, { Component } from 'react'
import debounce from 'debounce'
import LIGHTBOXSIZES from './lightboxVars'
import { MOBILEMAXWIDTH } from '../../../globals'

const fitLightbox = (WrappedComponent, fixedRatio, maxWidth = 1, maxWidthTablet = 1 /* give both as decimal */) => {
  return class FitLightbox extends Component {
    constructor (props) {
      super(props)

      this.state = { width: '0', height: '0' }

      this.initUpdateWindowDimensions = this.updateWindowDimensions.bind(this)
      this.updateWindowDimensions = debounce(this.updateWindowDimensions.bind(this), 200)
    }

    componentDidMount () {
      this.initUpdateWindowDimensions()
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

    getLightboxWidth () {
      if (this.state.width > MOBILEMAXWIDTH) {
        return this.getTabletWidth()
      }
      return this.getMobileWidth()
    }

    getMobileWidth () {
      if (maxWidth) {
        return (LIGHTBOXSIZES.width * this.state.width) * maxWidth
      }
      return (LIGHTBOXSIZES.width * this.state.width)
    }

    getTabletWidth () {
      if (maxWidthTablet) {
        return (LIGHTBOXSIZES.widthTabletDesktop * this.state.width) * maxWidthTablet
      }
      return (LIGHTBOXSIZES.widthTabletDesktop * this.state.width)
    }

    getHeightAndWidthForFixedRatio () {
      let height = this.getLightboxHeight()
      let width = height * (1 / fixedRatio) // youtube aspect ratio

      if (width > this.getLightboxWidth()) {
        width = this.getLightboxWidth()
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
        width: this.getLightboxWidth()
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
