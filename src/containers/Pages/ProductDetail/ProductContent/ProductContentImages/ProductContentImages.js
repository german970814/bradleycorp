import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImages.scss'
import ScrollableList from '../../../../ScrollableList/ScrollableList'
import ButtonUp from './ButtonUp'
import ButtonDown from './ButtonDown'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.renderImagesList = this.renderImagesList.bind(this)
    this.getImagesSrcListWithFeaturedImage = this.getImagesSrcListWithFeaturedImage.bind(this)
  }

  renderImagesList () {
    const imagesSrcList = this.getImagesSrcListWithFeaturedImage()
    return imagesSrcList.map((imageSrc, index) => {
      const style={
        backgroundImage: `url(${imageSrc})`
      }
      return (
        <div
          key={index}
          style={style} />
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
        listItemClassName={style.imageListItem}
        ulClassName={style.imagesList}
        buttonUp={<ButtonUp />}
        buttonDown={<ButtonDown />} >
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
