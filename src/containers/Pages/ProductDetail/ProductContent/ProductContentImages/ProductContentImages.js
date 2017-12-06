import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductContentImagesListItem from './ProductContentImagesListItem/ProductContentImagesListItem'
import style from './ProductContentImages.scss'
import ScrollableList from '../../../../ScrollableList/ScrollableList'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedImageSrc: '',
      imagesSrcList: []
    }

    this.renderSelectedImage = this.renderSelectedImage.bind(this)
    this.setInitState = this.setInitState.bind(this)
    this.renderImagesList = this.renderImagesList.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.images !== this.props.images) {
      this.setInitState(nextProps)
    }
  }

  setInitState (props) {
    if (props.featuredImageSrc) {
      return this.setState({
        selectedImageSrc: props.featuredImageSrc,
        imagesSrcList: [ props.featuredImageSrc, ...props.images.split(',') ]
      })
    }

    const imagesSrcList = this.props.images.split(',')

    return this.setState({
      selectedImageSrc: imagesSrcList[0],
      imagesSrcList
    })
  }

  handleImageListItemClick (e, imageSrc) {
    e.preventDefault()

    this.setState({
      ...this.state,
      selectedImageSrc: imageSrc
    })
  }

  renderImagesList () {
    return this.state.imagesSrcList.map((imageSrc, index) => {
      return (
        <ProductContentImagesListItem
          key={index}
          onClick={this.handleImageListItemClick.bind(this)}
          src={imageSrc} />
      )
    })
  }

  renderSelectedImage () {
    return (
      <img src={this.state.selectedImageSrc}></img>
    )
  }

  render () {
    return (
      <div>
        <div
          className={style.selectedImage}>
          {this.renderSelectedImage()}
        </div>
        <ScrollableList
          numberToDisplay={3}
          wrapperClassName={style.imagesListWrapper}
          ulClassName={style.imagesList}
          listItemClassName={style.imageListItem} >
          {this.renderImagesList()}
        </ScrollableList>
      </div>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired
}

/*
<ul
  className={style.imagesList}>
  <ProductContentImagesList
    imagesSrcList={this.state.imagesSrcList}
    listItemClickHandler={this.handleImageListItemClick.bind(this)} />
</ul>
*/

export default ProductContentImages
