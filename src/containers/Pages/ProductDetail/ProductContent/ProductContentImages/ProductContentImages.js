import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImages.scss'
import ScrollableList from '../../../../ScrollableList/ScrollableList'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.renderImagesList = this.renderImagesList.bind(this)
    this.getImagesSrcListWithFeaturedImage = this.getImagesSrcListWithFeaturedImage.bind(this)
  }

  renderImagesList () {
    const imagesSrcList = this.getImagesSrcListWithFeaturedImage()
    return imagesSrcList.map((imageSrc, index) => {
      return (
        <img
          key={index}
          src={imageSrc} />
      )
    })
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
        wrapperClassName={style.imagesListWrapper}
        listItemClassName={style.listItem}
        ulClassName={style.imagesList} >
        {this.renderImagesList()}
      </ScrollableList>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired
}

export default ProductContentImages
