import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayerLightbox from '../../../../../../../components/Partials/Youtube/YoutubePlayerLightbox/YoutubePlayerLightbox'
import Lightbox from '../../../../../../Partials/Lightbox/Lightbox'
import style from './VerticalListItem.scss'

class VerticalListItem extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }
    return (
      <div
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItem} />
    )
  }

  renderVideo () {
    const videoStyle = {
      backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@2x.png')})`
    }
    return (
      <Lightbox>

        <div
          style={videoStyle}
          className={style.listItemVideo} />

        <YoutubePlayerLightbox
          src={this.props.src} />

      </Lightbox>
    )
  }

  render () {
    if (this.props.video) {
      return this.renderVideo()
    }
    return this.renderImage()
  }
}

VerticalListItem.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  video: PropTypes.bool
}

export default VerticalListItem