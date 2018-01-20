import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import addVideoIdFromSrc from '../../../../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import FixedAspectRatioBox from '../../../../../../../../components/Partials/FixedAspectRatioBox/FixedAspectRatioBox'
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
      <FixedAspectRatioBox>
        <YoutubeWithID />
      </FixedAspectRatioBox>
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
  video: PropTypes.bool
}

export default ListItemLightbox
