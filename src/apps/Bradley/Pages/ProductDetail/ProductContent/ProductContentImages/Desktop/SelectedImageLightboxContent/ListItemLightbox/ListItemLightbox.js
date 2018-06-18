import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BCorpVideo from '../../../../../../../../../lib/components/BCorpVideo/BCorpVideo'
// import { youtubeParser } from '../../../../../../../../../lib/bcorpUrl'
import LIGHTBOXSIZES from '../../../../../../../../../lib/containers/Lightbox/lightboxVars'
import FixedAspectRatioBox from '../../../../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import style from './ListItemLightbox.scss'

class ListItemLightbox extends Component {
  renderImage () {
    const imageStyle = {
      backgroundImage: `url(${this.props.src})`
    }

    return <div style={imageStyle} className={style.listItemLightbox} />
  }

  renderVideo () {
    // const videoId = youtubeParser(this.props.src) || ''
    return (
      <FixedAspectRatioBox maxHeight={LIGHTBOXSIZES.heightMinusCloseButton}>
        <BCorpVideo
          url={this.props.src}
          youtubeProps={{
            opts: {
              width: '100%',
              height: '100%'
            }
          }}
          vimeoProps={{
            width: '100%',
            height: '100%'
          }}
        />
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
