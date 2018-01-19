import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableListOpensInLightbox from '../../../../../Partials/ScrollableList/ScrollableListOpensInLightbox'
import YoutubePlayerLightbox from '../../../../../../components/Partials/Youtube/YoutubePlayerLightbox/YoutubePlayerLightbox'
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
    const images = (imgSrcs && imgSrcs[0].length)
      ? imgSrcs.map((imageSrc, index) => {
        const imageStyle = {
          backgroundImage: `url(${imageSrc})`
        }
        console.log(imgSrcs)
        return (
          <React.Fragment
            key={index} >

            {/* display in scroller */}
            <div
              src={imageSrc}
              style={imageStyle}
              className={[style.imageDiv, style.fitBackground].join(' ')} />

            {/* display in lightbox scroller */}
            <div
              src={imageSrc}
              style={imageStyle}
              className={[style.imageDiv, style.fitBackground].join(' ')} />

          </React.Fragment>
        )
      })
      : []

    const videos = (this.props.videos && this.props.videos.length)
      ? this.props.videos.split(',').map((videoSrc, index) => {
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
            <YoutubePlayerLightbox
              src={videoSrc}
              maxWidth={0.8}
              maxWidthTablet={0.8} />

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
        showPosition
        wrapperClassName={style.imagesListWrapper}
        listItemClassName={style.imageListItem}
        ulClassName={style.imagesList}
        buttonUp={<ButtonLeft />}
        buttonDown={<ButtonRight />} >
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
