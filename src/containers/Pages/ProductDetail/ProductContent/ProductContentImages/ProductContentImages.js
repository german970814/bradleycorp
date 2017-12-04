import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductContentImagesList from './ProductContentImagesList/ProductContentImagesList'
import style from './ProductContentImages.scss'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedImageSrc: '',
      imagesSrcList: []
    }

    this.renderSelectedImage = this.renderSelectedImage.bind(this)
    this.setInitState = this.setInitState.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setInitState()
    }
  }

  setInitState () {
    if (this.props.featuredImageSrc) {
      return this.setState({
        selectedImageSrc: this.props.featuredImageSrc,
        imagesSrcList: [ this.props.featuredImageSrc, ...this.props.images.split(',') ]
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
        <ul
          className={style.imagesList}>
          <ProductContentImagesList
            imagesSrcList={this.state.imagesSrcList}
            listItemClickHandler={this.handleImageListItemClick.bind(this)} />
        </ul>
      </div>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired
}

export default ProductContentImages
