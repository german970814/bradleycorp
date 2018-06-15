import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BCorpVideo from '../../../../../../../../lib/components/BCorpVideo/BCorpVideo'
import LIGHTBOXSIZES from '../../../../../../../../lib/containers/Lightbox/lightboxVars'
import FixedAspectRatioBox from '../../../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import LightboxV2 from '../../../../../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import style from './VerticalListItem.scss'

class VerticalListItem extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }

    return (
      <div
        onClick={e => {
          this.props.onClick(e, this.props.src)
        }}
        onTouchEnd={e => {
          this.props.onClick(e, this.props.src)
        }}
        style={imageStyle}
        className={style.listItem}
      />
    )
  }

  renderVideo () {
    const youtubeProps = {
      opts: {
        width: '100%',
        height: '100%',
        playerVars: {
          showinfo: 0,
          modestbranding: 1,
          controls: 1
        }
      }
    }

    const vimeoProps = {
      playerOptions: {
        byline: false,
        loop: true,
        portrait: false,
        title: false
      }
    }

    return (
      <LightboxV2
        renderChildren={openLightbox => {
          return (
            <div
              onClick={openLightbox}
              style={{
                backgroundImage: `url(${require('../../../../../../../../images/icon-video/icon-video@2x.png')})`
              }}
              className={style.listItemVideo}
            />
          )
        }}
        renderLightboxContents={() => {
          return (
            <FixedAspectRatioBox
              maxHeight={LIGHTBOXSIZES.heightMinusCloseButton}>
              <BCorpVideo
                url={this.props.src}
                youtubeProps={youtubeProps}
                vimeoProps={vimeoProps}
                autoplay
              />
            </FixedAspectRatioBox>
          )
        }}
      />
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
