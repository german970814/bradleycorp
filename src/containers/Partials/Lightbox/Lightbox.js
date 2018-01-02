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

  openLightbox() {
    this.setState({
      isOpen: true
    })
  }

  closeLightbox() {
    this.setState({
      isOpen: false
    })
  }

  renderLightbox () {
    if (this.state.isOpen) {
      return (
        <div
          className={[style.background, this.props.backgroundClass].join(' ')} >
          <span className={style.vAlignHelper}/>
          <div
            className={[style.lightbox, this.props.lightboxClass].join(' ')} >
            {this.props.children}
            <div
              className={style.closeButtonWrapper}
              onClick={this.toggleOpen} >
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
        className={style.childWrapper}
        onClick={this.toggleOpen}>
        {this.props.children}
        {this.renderLightbox()}
      </div>
    )
  }
}

Lightbox.propTypes = {
  children: PropTypes.object.isRequired,
  backgroundClass: PropTypes.string,
  lightboxClass: PropTypes.string
}

export default Lightbox
