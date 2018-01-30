import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
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

  renderChildrenWithLightboxAPI () {
    const lightboxChildStyle = { cursor: 'zoom-in' }
    const childrenWithAPI = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        style: { ...child.props.style, ...lightboxChildStyle },
        onClick: this.toggleOpen.bind(this)
      })
    })

    const children = React.Children.toArray(childrenWithAPI)

    if (children.length === 1) {
      return children
    }
    children.pop()
    return children
  }

  getLightboxContent () {
    const children = React.Children.toArray(this.props.children)
    // takes last child as lightbox content
    return children[children.length - 1]
  }

  renderLightbox () {
    if (this.state.isOpen) {
      return ReactDOM.createPortal((
        <div
          className={[style.background, this.props.backgroundClass].join(' ')}
          onClick={this.closeLightbox.bind(this)} >

          <VerticalAlignHelper />

          <div
            className={style.lightbox} >

            {this.getLightboxContent()}

            <LightboxCloseButton
              onClick={this.closeLightbox.bind(this)} />

          </div>

        </div>
      ), document.getElementById('lightbox'))
    }
  }

  render () {
    return (
      <div
        className={style.childWrapper} >
        {this.renderChildrenWithLightboxAPI()}
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
