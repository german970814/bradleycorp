import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { updateBlur } from '../../../apps/Bradley/App/updateBlur'
import VerticalAlignHelper from '../../components/VerticalAlignHelper/VerticalAlignHelper'
import LightboxCloseButton from './LightboxCloseButton'
import style from './Lightbox.scss'

/**
 * This component will receive two elements. On clicking the first one, the second one will open in a lightbox.
 */
class Lightbox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggleOpen () {
    if (!this.state.isOpen) {
      return this.openLightbox()
    }
    this.closeLightbox()
  }

  openLightbox () {
    if (this.props.onLightboxOpen) {
      this.props.onLightboxOpen()
    }

    this.setState({
      isOpen: true
    })
  }

  closeLightbox () {
    if (this.props.onLightboxClose) {
      this.props.onLightboxClose()
    }

    this.setState({
      isOpen: false
    })
  }

  renderChildrenWithLightboxAPI () {
    const lightboxChildStyle = { cursor: 'zoom-in' }
    const childrenWithAPI = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        style: { ...child.props.style, ...lightboxChildStyle },
        onClick: () => {
          updateBlur(true)
          this.openLightbox()
        }
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
      return ReactDOM.createPortal(
        <div
          className={[style.background, this.props.backgroundClass].join(' ')}
          onClick={() => {
            updateBlur(false)
            this.closeLightbox()
          }}>
          <VerticalAlignHelper />

          <div className={style.lightbox}>
            {this.getLightboxContent()}

            <LightboxCloseButton
              onClick={() => {
                updateBlur(false)
                this.closeLightbox()
              }}
            />
          </div>
        </div>,
        document.getElementById('lightbox')
      )
    }
  }

  render () {
    return (
      <div className={style.childWrapper}>
        {this.renderChildrenWithLightboxAPI()}
        {this.renderLightbox()}
      </div>
    )
  }
}

Lightbox.propTypes = {
  /**
   * Should be two children, the first is rendered as normal and the second is rendered inside a lightbox on clicking the first.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom css class for the lightbox background
   */
  backgroundClass: PropTypes.string,
  /**
   * The lightbox close button element
   */
  closeButton: PropTypes.func,
  /**
   * Can pass a listener to the close button on click event
   */
  closeButtonOnClick: PropTypes.func,
  /**
   * Can pass a listener to lightbox open event
   */
  onLightboxOpen: PropTypes.func,
  /**
   * Can pass a listener to lightbox close event
   */
  onLightboxClose: PropTypes.func
}

export default Lightbox
