import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../components/Partials/VerticalAlignHelper/VerticalAlignHelper'
import LightboxCloseButton from './LightboxCloseButton'
import style from './Lightbox.scss'

class Lightbox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.renderLightbox = this.renderLightbox.bind(this)
  }

  toggleOpen () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  openLightbox () {
    this.setState({
      isOpen: true
    })
  }

  closeLightbox () {
    this.setState({
      isOpen: false
    })
  }

  getChildrenWithLightboxApi () {
    const lightboxChildStyle = { cursor: 'zoom-in' }
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        style: { ...child.props.style, ...lightboxChildStyle },
        onClick: this.toggleOpen.bind(this)
      })
    })
  }

  renderChildrenWithLightboxContentRemoved () {
    const childrenWithLightboxApi = this.getChildrenWithLightboxApi()
    const children = React.Children.toArray(childrenWithLightboxApi)

    if (children.length === 1) {
      return children
    }
    children.pop()
    return children
  }

  getLightboxContent () {
    const childrenWithLightboxSize = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        // give the child the button to close the lightbox
        lightboxCloseButton: LightboxCloseButton,
        lightboxCloseButtonOnClick: this.closeLightbox.bind(this)
      })
    })

    const children = React.Children.toArray(childrenWithLightboxSize)
    // takes last child as lightbox content
    return children[children.length - 1]
  }

  renderLightbox () {
    if (this.state.isOpen) {
      return (
        <div
          className={[style.background, this.props.backgroundClass].join(' ')} >
          <VerticalAlignHelper />
          <div
            className={style.lightbox} >
            {this.getLightboxContent()}
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.childWrapper} >
        {this.renderChildrenWithLightboxContentRemoved()}
        {this.renderLightbox()}
      </div>
    )
  }
}

Lightbox.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundClass: PropTypes.string,
  closeButton: PropTypes.func,
  closeButtonOnClick: PropTypes.func
}

export default Lightbox
