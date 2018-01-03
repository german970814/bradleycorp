import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableList from '../../../../../Partials/ScrollableList/ScrollableList'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './ProductContentImagesMobileTablet.scss'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.renderList = this.renderList.bind(this)
    this.getImagesSrcListWithFeaturedImage = this.getImagesSrcListWithFeaturedImage.bind(this)
  }

  renderList () {
    const imagesSrcList = this.getImagesSrcListWithFeaturedImage()
    const images = imagesSrcList.map((imageSrc, index) => {
      const imageStyle = {
        backgroundImage: `url(${imageSrc})`
      }
      return (
        <div
          key={index}
          style={imageStyle} />
      )
    })

    const videos = this.props.videos.split(',').map((videoSrc, index) => {
      const videoStyle = {
        backgroundImage: `url(${require('../../../../../../images/icon-video/icon-video@3x.png')})`
      }
      return (
        <div
          key={index}
          style={videoStyle}
          className={style.videoListItem} />
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
