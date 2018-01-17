import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import ScrollableListOpensInLightbox from '../../../../../Partials/ScrollableList/ScrollableListOpensInLightbox'
import addVideoIdFromSrc from '../../../../../../components/Partials/Youtube/addVideoIdFromSrc'
import FitLightboxYoutube from '../../../../../Partials/Lightbox/FitLightboxYoutube'
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

  renderList () {
    const imgSrcs = this.getImagesSrcListWithFeaturedImage()
    const images = imgSrcs.map((imageSrc, index) => {
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
            className={style.fitBackground} />

          {/* display in lightbox scroller */}
          <div
            src={imageSrc}
            style={imageStyle}
            className={style.fitBackground} />

        </React.Fragment>
      )
    })

    const videos = (this.props.videos && this.props.videos.length)
      ? this.props.videos.split(',').map((videoSrc, index) => {
        const YoutubeWithID = addVideoIdFromSrc(YouTube, videoSrc)
        const videoStyle = {
          backgroundImage: `url(${require('../../../../../../images/icon-video/icon-video@3x.png')})`
        }
        return (
          <React.Fragment
            key={`video_${index}`}>

            {/* display in scroller */}
            <div
              style={videoStyle}
              className={[style.videoListItem, style.fitBackground].join(' ')} />

            {/* display in lightbox scroller */}
            <FitLightboxYoutube>
              {(width, height) => {
                return (
                  <YoutubeWithID
                    opts={{width, height}}/>
                )
              }}
            </FitLightboxYoutube>

          </React.Fragment>
        )
      })
      : []

    return [...images, ...videos]
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
