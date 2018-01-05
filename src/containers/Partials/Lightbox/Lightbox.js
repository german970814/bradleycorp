import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VerticalAlignHelper from '../../../components/Partials/VerticalAlignHelper/VerticalAlignHelper'
import LightboxContent from './LightboxContent'
import LightboxCloseButton from './LightboxCloseButton'
import style from './Lightbox.scss'

class Lightbox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      contentSize: {
        width: 0,
        height: 0
      }
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

  updateContentSize (width, height) {
    this.setState({
      ...this.state,
      contentSize: {
        width,
        height
      }
    })
  }

  getChildrenWithLightboxApi () {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onClick: this.toggleOpen.bind(this)
      })
    })
  }

  renderChildrenWithLightboxContentRemoved () {
    const childrenWithLightboxApi = this.getChildrenWithLightboxApi()
    const children = React.Children.toArray(childrenWithLightboxApi)
    children.pop()
    return children
  }

  getLightboxContent () {
    const childrenWithLightboxSize = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        // we want lightbox content children to have access to lightbox size
        lightboxSize: this.state.contentSize,
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
          <LightboxContent
            closeLightbox={this.closeLightbox.bind(this)}
            updateContentSize={this.updateContentSize.bind(this)}>
            {this.getLightboxContent()}
          </LightboxContent>
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
  backgroundClass: PropTypes.string
}

export default Lightbox
