import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { youtubeParser } from '../../../../../../../lib/bcorpUrl'
import { clean } from '../../../../../../../lib/bcorpArray'
import FixedAspectRatioBox from '../../../../../../../lib/components/FixedAspectRatioBox/FixedAspectRatioBox'
import LIGHTBOXSIZES from '../../../../../../../lib/containers/Lightbox/lightboxVars'
import ScrollableListOpensInLightbox from '../../../../../../../lib/containers/ScrollableList/ScrollableListOpensInLightbox/ScrollableListOpensInLightbox'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './ProductContentImagesMobileTablet.scss'

class ProductContentImages extends Component {
  getImagesSrcListWithFeaturedImage () {
    const imgSrcs = this.props.images.split(',')
    if (imgSrcs.includes(this.props.featuredImageSrc)) {
      return imgSrcs
    }
    return [ this.props.featuredImageSrc, ...imgSrcs ]
  }

  getImageSrcs () {
    let imgSrcs = this.getImagesSrcListWithFeaturedImage()
    imgSrcs = clean(imgSrcs, '')
    imgSrcs = clean(imgSrcs, undefined)

    if (!imgSrcs || imgSrcs.length === 0) {
      return []
    }

    return imgSrcs.map((imageSrc, index) => {
      const imageStyle = {
        backgroundImage: `url(${imageSrc})`
      }
      return (
        <React.Fragment
          key={index} >

          {/* display in scroller */}
          <div
            src={imageSrc}
            style={imageStyle}
            className={`${style.fitBackground} ${style.scrollerImage}`} />

          {/* display in lightbox scroller */}
          <div
            src={imageSrc}
            style={imageStyle}
            className={`${style.fitBackground} ${style.scrollerImage}`} />

        </React.Fragment>
      )
    })
  }

  getVideoSrcs () {
    let videoSrcs = this.props.videos.split(',')
    videoSrcs = clean(videoSrcs, '')
    videoSrcs = clean(videoSrcs, undefined)

    if (!videoSrcs || videoSrcs.length === 0) {
      return []
    }

    return videoSrcs.map((videoSrc, index) => {
      const videoId = youtubeParser(videoSrc) || ''
      const videoStyle = {
        backgroundImage: `url(${require('../../../../../../../images/icon-video/icon-video@3x.png')})`
      }
      return (
        <React.Fragment
          key={`video_${index}`}>

          {/* display in scroller */}
          <div
            style={videoStyle}
            className={[style.videoListItem, style.fitBackground].join(' ')} />

          {/* display in lightbox scroller */}
          <div className={style.videoLightboxPadding} >
            <FixedAspectRatioBox
              maxHeight={LIGHTBOXSIZES.heightMinusCloseButton}>
              <YouTube
                videoId={videoId}
                opts={{
                  width: '100%',
                  height: '100%'
                }} />
            </FixedAspectRatioBox>
          </div>

        </React.Fragment>
      )
    })
  }

  renderList () {
    return [...this.getImageSrcs(), ...this.getVideoSrcs()]
  }

  render () {
    return (
      <ScrollableListOpensInLightbox
        numberToDisplay={1}
        touchMoveSensitivity={2.5}
        wrapperClassName={style.imagesList}
        lightboxWrapperClassName={style.lightboxContentWrapper}
        buttonUp={<ButtonLeft />}
        buttonDown={<ButtonRight />}
        stopEventBubblingFromButtons
        showPosition >
        {this.renderList()}
      </ScrollableListOpensInLightbox>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired,
  videos: PropTypes.string
}

export default ProductContentImages
