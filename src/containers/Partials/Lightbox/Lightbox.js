import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  getLightboxContent () {
    const children = React.Children.toArray(this.props.children)
    return children[children.length - 1]
  }

  getChildrenWithLightboxApi () {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onClick: this.toggleOpen.bind(this)
      })
    })
  }

  getChildrenWithLightboxContentRemoved () {
    const childrenWithLightboxApi = this.getChildrenWithLightboxApi()
    const children = React.Children.toArray(childrenWithLightboxApi)
    children.pop()
    return children
  }

  renderLightbox () {
    if (this.state.isOpen) {
      return (
        <div
          className={[style.background, this.props.backgroundClass].join(' ')} >
          <span className={style.vAlignHelper}/>
          <div
            className={[style.lightbox, this.props.lightboxClass].join(' ')} >
            {this.getLightboxContent()}
            <div
              className={style.closeButtonWrapper}
              onClick={this.closeLightbox.bind(this)} >
              <img
                className={style.closeButton}
                src={require('../../../images/icon-close/icon-close@2x.png')} />
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={style.childWrapper} >
        {this.getChildrenWithLightboxContentRemoved()}
        {this.renderLightbox()}
      </div>
    )
  }
}

Lightbox.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundClass: PropTypes.string,
  lightboxClass: PropTypes.string
}

export default Lightbox
