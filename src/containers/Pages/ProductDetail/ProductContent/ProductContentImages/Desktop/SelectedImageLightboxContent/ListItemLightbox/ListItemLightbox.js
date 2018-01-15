import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../../../../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import FitLightboxYoutube from '../../../../../../../Partials/Lightbox/FitLightboxYoutube'
import style from './ListItemLightbox.scss'

class ListItemLightbox extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }

    return (
      <div
        style={imageStyle}
        className={style.listItemLightbox} />
    )
  }

  renderVideo () {
    const YoutubeWithID = addVideoIdFromSrc(YouTube, this.props.src)
    return (
      <FitLightboxYoutube>
        {(width, height) => {
          <YoutubeWithID
             opts={{width, height}}/>
        }}
      </FitLightboxYoutube>

    )
  }

  render () {
    if (this.props.video) {
      return this.renderVideo()
    }
    return this.renderImage()
  }
}

ListItemLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  video: PropTypes.bool
}

export default ListItemLightbox
