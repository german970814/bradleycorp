import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rotate } from '../../../../../../lib/bcorpArray'
import ProductContentImagesListItem from './ProductContentImagesListItem/ProductContentImagesListItem'
import ProductContentImagesListItemLightbox from './ProductContentImagesListItemLightbox/ProductContentImagesListItemLightbox'
import ScrollableList from '../../../../../Partials/ScrollableList/ScrollableList'
import SimpleSlider from '../../../../../Partials/SimpleSlider/SimpleSlider'
import Lightbox from '../../../../../Partials/Lightbox/Lightbox'
import ButtonDown from './ButtonDown'
import ButtonUp from './ButtonUp'
import style from './ProductContentImagesDesktop.scss'

class ProductContentImages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedImageSrc: '',
      imagesSrcList: [],
      videosSrcList: []
    }

    this.renderSelectedImage = this.renderSelectedImage.bind(this)
    this.setInitState = this.setInitState.bind(this)
    this.renderList = this.renderList.bind(this)
  }

  componentDidMount () {
    this.setInitState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.images !== this.props.images ||
    nextProps.featuredImageSrc !== this.props.featuredImageSrc) {
      this.setInitState(nextProps)
    }
  }

  setInitState (props) {
    const videosSrcList = props.videos.split(',')
    const imageSrcs = props.images.split(',')

    if (props.featuredImageSrc) {
      const imagesSrcList = this.withFeaturedImage(props, imageSrcs)
      return this.setState({
        selectedImageSrc: props.featuredImageSrc,
        imagesSrcList,
        videosSrcList
      })
    }

    return this.setState({
      selectedImageSrc: imageSrcs[0],
      imagesSrcList: imageSrcs,
      videosSrcList
    })
  }

  withFeaturedImage (props, imgSrcs) {
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

  renderList () {
    const imgs = this.state.imagesSrcList.map((imageSrc, index) => {
      return (
        <ProductContentImagesListItem
          key={index}
          onClick={this.handleImageListItemClick.bind(this)}
          src={imageSrc} />
      )
    })
    const videos = this.state.videosSrcList.map((videoSrc, index) => {
      return (
        <ProductContentImagesListItem
          key={`video_${index}`}
          src={videoSrc}
          video />
      )
    })

    return [...imgs, ...videos]
  }

  renderImagesListLightbox () {
    const imageSrcs = this.state.imagesSrcList
    const selectedIndex = imageSrcs.indexOf(this.state.selectedImageSrc)

    const orderedImageSrcs = rotate(imageSrcs, selectedIndex)

    return orderedImageSrcs.map((imageSrc, index) => {
      return (
        <ProductContentImagesListItemLightbox
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
      <Lightbox
        lightboxClass={style.lightbox} >
        <div
          style={imageStyle}
          className={style.selectedImageDesktopImage} />
        <SimpleSlider
          title={''}
          numberMobile={1}
          numberTablet={1}
          numberDesktop={1}
          nextPrevButtonsForMobile={false}
          desktopWrapperClassName={style.lightboxWrapper}
          ulClassName={style.lightboxUlClassName}
          listItemClassName={style.lightboxListItem} >
          {this.renderImagesListLightbox()}
        </SimpleSlider>
      </Lightbox>
    )
  }

  render () {
    return (
      <React.Fragment>

        <div
          className={style.vAlignHelper} />

        <div
          key={2}
          className={style.selectedImageDesktop}>
          {this.renderSelectedImage()}
        </div>

        <ScrollableList
          key={3}
          numberToDisplay={3}
          reverseScroll={true}
          wrapperClassName={style.imagesListWrapperDesktop}
          ulClassName={style.imagesListDesktop}
          listItemClassName={style.imageListItemDesktop}
          buttonDown={<ButtonDown />}
          buttonUp={<ButtonUp />} >
          {this.renderList()}
        </ScrollableList>

      </React.Fragment>
    )
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired,
  videos: PropTypes.string
}

export default ProductContentImages
