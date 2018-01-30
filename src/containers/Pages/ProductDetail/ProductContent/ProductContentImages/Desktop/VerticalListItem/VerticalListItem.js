import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { youtubeParser } from '../../../../../../../lib/bcorpUrl'
import LIGHTBOXSIZES from '../../../../../../../lib/containers/Lightbox/lightboxVars'
import FixedAspectRatioBox from '../../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import Lightbox from '../../../../../../../lib/containers/Lightbox/Lightbox'
import style from './VerticalListItem.scss'

class VerticalListItem extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }

    return (
      <div
        onClick={(e) => { this.props.onClick(e, this.props.src) }}
        onTouchEnd={(e) => { this.props.onClick(e, this.props.src) }}
        style={imageStyle}
        className={style.listItem} />
    )
  }

  renderVideo () {
    const videoId = youtubeParser(this.props.src) || ''
    const videoStyle = {
      backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@2x.png')})`
    }
    return (
      <Lightbox>

        <div
          style={videoStyle}
          className={style.listItemVideo} />

        <FixedAspectRatioBox
          maxHeight={LIGHTBOXSIZES.heightMinusCloseButton} >
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%'
            }} />
        </FixedAspectRatioBox>

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
