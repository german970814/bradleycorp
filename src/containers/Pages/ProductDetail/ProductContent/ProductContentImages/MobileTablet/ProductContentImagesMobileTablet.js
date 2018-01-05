import React, { Component } from 'react'
import PropTypes from 'prop-types'
import YoutubePlayerLightbox from '../../../../../../components/Partials/Youtube/YoutubePlayerLightbox/YoutubePlayerLightbox'
import Lightbox from '../../../../../Partials/Lightbox/Lightbox'
import SimpleSliderLightbox from '../../../../../Partials/SimpleSlider/SimpleSliderLightbox/SimpleSliderLightbox'
import ScrollableList from '../../../../../Partials/ScrollableList/ScrollableList'
import ProductContentImagesListItemLightbox from '../ProductContentImagesListItemLightbox/ProductContentImagesListItemLightbox'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './ProductContentImagesMobileTablet.scss'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.renderList = this.renderList.bind(this)
    this.getImagesSrcListWithFeaturedImage = this.getImagesSrcListWithFeaturedImage.bind(this)
  }

  getListForLightbox () {
    const imagesSrcList = this.getImagesSrcListWithFeaturedImage()

    return imagesSrcList.map((imageSrc, index) => {
      return (
        <ProductContentImagesListItemLightbox
          key={index}
          src={imageSrc} />
      )
    })
  }

  renderList () {
    const imagesSrcList = this.getImagesSrcListWithFeaturedImage()
    const images = imagesSrcList.map((imageSrc, index) => {
      const imageStyle = {
        backgroundImage: `url(${imageSrc})`
      }
      return (
        <Lightbox
          key={index}>

          <div
            style={imageStyle}
            className={style.fitBackground} />

          <SimpleSliderLightbox>
            {this.getListForLightbox()}
          </SimpleSliderLightbox>

        </Lightbox>

      )
    })

    const videos = this.props.videos.split(',').map((videoSrc, index) => {
      const videoStyle = {
        backgroundImage: `url(${require('../../../../../../images/icon-video/icon-video@3x.png')})`
      }
      return (
        <Lightbox
          key={`video_${index}`} >

          <div
            style={videoStyle}
            className={[style.videoListItem, style.fitBackground].join(' ')} />

          <YoutubePlayerLightbox
            src={videoSrc} />

        </Lightbox>
      )
    })

    return [...images, ...videos]
  }

  getImagesSrcListWithFeaturedImage () {
    const imgSrcs = this.props.images.split(',')
    if (imgSrcs.includes(this.props.featuredImageSrc)) {
      return imgSrcs
    }
    return [ this.props.featuredImageSrc, ...imgSrcs ]
  }

  render () {
    return (
      <ScrollableList
        numberToDisplay={1}
        showPosition={true}
        wrapperClassName={style.imagesListWrapper}
        listItemClassName={style.imageListItem}
        ulClassName={style.imagesList}
        buttonUp={<ButtonLeft />}
        buttonDown={<ButtonRight />} >
        {this.renderList()}
      </ScrollableList>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired,
  videos: PropTypes.string
}

export default ProductContentImages
