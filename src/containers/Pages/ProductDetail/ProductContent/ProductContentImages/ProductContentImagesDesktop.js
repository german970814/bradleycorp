import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductContentImagesListItem from './ProductContentImagesListItem/ProductContentImagesListItem'
import style from './ProductContentImagesDesktop.scss'
import ScrollableList from '../../../../ScrollableList/ScrollableList'
import ButtonDown from './ButtonDown'
import ButtonUp from './ButtonUp'

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

  componentDidMount () {
    this.setInitState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.images !== this.props.images) {
      this.setInitState(nextProps)
    }
  }

  setInitState (props) {
    if (props.featuredImageSrc) {
      const imagesSrcList = this.getImagesSrcListWithFeaturedImage(props)
      return this.setState({
        selectedImageSrc: props.featuredImageSrc,
        imagesSrcList
      })
    }

    const imagesSrcList = props.images.split(',')

    return this.setState({
      selectedImageSrc: imagesSrcList[0],
      imagesSrcList
    })
  }

  getImagesSrcListWithFeaturedImage (props) {
    const imgSrcs = props.images.split(',')
    if (imgSrcs.includes(props.featuredImageSrc)) {
      return imgSrcs
    }
    return [ props.featuredImageSrc, ...imgSrcs ]
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
    const imageStyle = {
      backgroundImage: `url(${this.state.selectedImageSrc})`
    }
    return (
      <div style={imageStyle} />
    )
  }

  render () {
    return (
      [
        <div key={1} className={style.vAlignHelper} />,
        <div
          key={2}
          className={style.selectedImageDesktop}>
          {this.renderSelectedImage()}
        </div>,
        <ScrollableList
          key={3}
          numberToDisplay={3}
          wrapperClassName={style.imagesListWrapperDesktop}
          ulClassName={style.imagesListDesktop}
          listItemClassName={style.imageListItemDesktop}
          buttonDown={<ButtonDown />}
          buttonUp={<ButtonUp />} >
          {this.renderImagesList()}
        </ScrollableList>
      ]
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired
}

export default ProductContentImages
