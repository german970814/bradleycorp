import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImages.scss'

class ProductContentImages extends Component {
  constructor(props){
    super(props)

    this.state = {
      selectedImageSrc: '',
      imagesSrcList: []
    }

    this.renderImagesList = this.renderImagesList.bind(this)
    this.handleImageListItemClick = this.handleImageListItemClick.bind(this)
    this.renderSelectedImage = this.renderSelectedImage.bind(this)
    this.setInitState = this.setInitState.bind(this)
  }

  componentDidMount () {
    this.setInitState()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setInitState()
    }
  }

  handleImageListItemClick(e, imageSrc) {
    e.preventDefault()

    this.setState({
      ...this.state,
      selectedImageSrc: imageSrc
    })
  }

  renderImagesList() {
    return this.state.imagesSrcList.map( (imageSrc, index) => {
      return (
        <li
          key={index}
          className={style.imageListItem}
          onClick={(e) => this.handleImageListItemClick(e, imageSrc)} >
          <img src={imageSrc}></img>
        </li>
      )
    })
  }

  renderSelectedImage() {
    return (
      <img src={this.state.selectedImageSrc}></img>
    )
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <div
          className={style.selectedImage}>
          {this.renderSelectedImage()}
        </div>
        <ul
          className={style.imagesList}>
          {this.renderImagesList()}
        </ul>
      </div>
    )
  }

  setInitState() {

    if( this.props.featuredImageSrc ) {
      return this.setState({
        selectedImageSrc: this.props.featuredImageSrc,
        imagesSrcList: [ this.props.featuredImageSrc, ...this.props.images.split(",") ]
      })
    }

    const imagesSrcList = this.props.images.split(",")

    return this.setState({
      selectedImageSrc: imagesSrcList[0],
      imagesSrcList
    })

  }
}

ProductContentImages.propTypes = {
  featuredImage: PropTypes.string,
  images: PropTypes.string.isRequired
}

export default ProductContentImages
