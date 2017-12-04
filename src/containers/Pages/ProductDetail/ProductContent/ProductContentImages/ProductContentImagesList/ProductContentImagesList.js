import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ProductContentImagesList.scss'

class ProductContentImagesList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      listImages: []
    }

    this.setInitState = this.setInitState.bind(this)
    this.renderImagesList = this.renderImagesList.bind(this)
    this.getImagesToDisplay = this.getImagesToDisplay.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.imagesSrcList !== this.props.imagesSrcList) {
      this.setInitState()
    }
  }

  setInitState () {
    const listImages = this.props.imagesSrcList.map((imageSrc, index) => {
      return {
        src: imageSrc,
        position: index,
        display: index < 3
      }
    })
    this.setState({ listImages })
  }

  moveList (e, increment) {
    e.preventDefault()

    const listImages = this.state.listImages.map((listImage, index, allListImages) => {
      const position = this.getPosition(listImage.position, increment, allListImages.length)

      return {
        ...listImage,
        position: position,
        display: position < 3
      }
    })

    return this.setState({ ...this.state, listImages })
  }

  renderImagesList () {
    const displayImages = this.getImagesToDisplay()
    const displayImagesSorted = this.sortImagesByPosition(displayImages)

    return displayImagesSorted.map((image, index) => {
      return (
        <li
          key={index}
          className={style.imageListItem}
          onClick={(e) => { this.props.listItemClickHandler(e, image.src) }} >
          <img src={image.src}></img>
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <button
          onClick={(e) => { this.moveList(e, -1) }}>
          Move Up
        </button>
        {this.renderImagesList()}
        <button
          onClick={(e) => { this.moveList(e, 1) }}>
          Move Down
        </button>
      </div>
    )
  }

  getPosition (prevPos, increment, arrayLength) {
    const position = (prevPos + increment) % arrayLength
    return position < 0
      ? arrayLength + position
      : position
  }

  getImagesToDisplay () {
    return this.state.listImages.filter(listImage => {
      return listImage.display
    })
  }

  sortImagesByPosition (imagesArray) {
    return imagesArray.sort((image1, image2) => {
      return image1.position - image2.position
    })
  }
}

ProductContentImagesList.propTypes = {
  imagesSrcList: PropTypes.array.isRequired,
  listItemClickHandler: PropTypes.func.isRequired
}

export default ProductContentImagesList
