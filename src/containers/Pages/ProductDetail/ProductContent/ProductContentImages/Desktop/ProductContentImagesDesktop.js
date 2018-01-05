import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rotate } from '../../../../../../lib/bcorpArray'
import fitLightbox from '../../../../../Partials/Lightbox/fitLightbox'
import VerticalAlignHelper from '../../../../../../components/Partials/VerticalAlignHelper/VerticalAlignHelper'
import VerticalListItem from './VerticalListItem/VerticalListItem'
import ProductContentImagesListItemLightbox from '../ProductContentImagesListItemLightbox/ProductContentImagesListItemLightbox'
import ScrollableList from '../../../../../Partials/ScrollableList/ScrollableList'
import SimpleSliderLightbox from '../../../../../Partials/SimpleSlider/SimpleSliderLightbox/SimpleSliderLightbox'
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
        <VerticalListItem
          key={index}
          onClick={this.handleImageListItemClick.bind(this)}
          src={imageSrc} />
      )
    })
    const videos = this.state.videosSrcList.map((videoSrc, index) => {
      return (
        <VerticalListItem
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

    const ListItemWithHeight = fitLightbox(ProductContentImagesListItemLightbox, null)

    return orderedImageSrcs.map((imageSrc, index) => {
      return (
        <ListItemWithHeight
          key={index}
          src={imageSrc} />
      )
    })
  }

  renderSelectedImage () {
    const imageStyle = {
      backgroundImage: `url(${this.state.selectedImageSrc})`
    }

    return (
      <Lightbox>

        <div
          style={imageStyle}
          className={style.selectedImageDesktopImage} />

        <SimpleSliderLightbox>
          {this.renderImagesListLightbox()}
        </SimpleSliderLightbox>

      </Lightbox>
    )
  }

  render () {
    return (
      <React.Fragment>

        <VerticalAlignHelper />

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

  withFeaturedImage (props, imgSrcs) {
    if (imgSrcs.includes(props.featuredImageSrc)) {
      return imgSrcs
    }
    return [ props.featuredImageSrc, ...imgSrcs ]
  }
}

ProductContentImages.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired,
  videos: PropTypes.string
}

export default ProductContentImages
