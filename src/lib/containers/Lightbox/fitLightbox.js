import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import LIGHTBOXSIZES from './lightboxVars'
import { MOBILEMAXWIDTH } from '../../../globals'

class FitLightbox extends Component { // accepts a function as children and passes to it width and height of lightbox
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
    if (this.props.maxWidth) {
      return (LIGHTBOXSIZES.width * this.state.width) * this.props.maxWidth
    }
    return (LIGHTBOXSIZES.width * this.state.width)
  }

  getTabletWidth () {
    if (this.props.maxWidthTablet) {
      return (LIGHTBOXSIZES.widthTabletDesktop * this.state.width) * this.props.maxWidthTablet
    }
    return (LIGHTBOXSIZES.widthTabletDesktop * this.state.width)
  }

  getHeightAndWidthForFixedRatio () {
    let height = this.getLightboxHeight()
    let width = height * (1 / this.props.fixedRatio)

    if (width > this.getLightboxWidth()) {
      width = this.getLightboxWidth()
      height = width * this.props.fixedRatio
    }

    return { height, width }
  }

  getDimensions () {
    if (this.props.fixedRatio) {
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
    const containerStyle = {
      marginTop: `${margin}px`,
      marginBottom: `${margin}px`
    }

    return (
      <div
        style={containerStyle}>
        {this.props.children(dims.width, dims.height)}
      </div>
    )
  }
}

FitLightbox.propTypes = {
  children: PropTypes.func.isRequired,
  fixedRatio: PropTypes.number,
  maxWidth: PropTypes.number,
  maxWidthTablet: PropTypes.number
}

export default FitLightbox
