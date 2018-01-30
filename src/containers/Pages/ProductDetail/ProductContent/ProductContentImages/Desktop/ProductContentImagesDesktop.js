import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rotate } from '../../../../../../lib/bcorpArray'
import VerticalAlignHelper from '../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import VerticalListItem from './VerticalListItem/VerticalListItem'
import ScrollableList from '../../../../../Partials/ScrollableList/ScrollableList'
import Lightbox from '../../../../../Partials/Lightbox/Lightbox'
import ButtonDown from './ButtonDown'
import ButtonUp from './ButtonUp'
import SelectedImageLightboxContent from './SelectedImageLightboxContent/SelectedImageLightboxContent'
import ListItemLightbox from './SelectedImageLightboxContent/ListItemLightbox/ListItemLightbox'
import style from './ProductContentImagesDesktop.scss'

class ProductContentImagesDesktop extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedImageSrc: '',
      imagesSrcList: [],
      videosSrcList: []
    }

    this.renderSelectedImage = this.renderSelectedImage.bind(this)
    this.setInitState = this.setInitState.bind(this)
    this.renderVerticalList = this.renderVerticalList.bind(this)
    this.renderImagesListLightbox = this.renderImagesListLightbox.bind(this)
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
    const videosSrcList = (props.videos && props.videos.length)
      ? props.videos.split(',')
      : []
    const imageSrcs = (props.images && props.images.length)
      ? props.images.split(',')
      : []

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

  updateSelectedImage (src) {
    return this.setState({
      ...this.state,
      selectedImageSrc: src
    })
  }

  handleImageListItemClick (e, src) {
    if (e) {
      e.preventDefault()
    }

    return this.updateSelectedImage(src)
  }

  handleSelectedImageScrollerPositionChange (children) {
    const displayedChild = children.filter(child => {
      return child.display
    })

    const displayedChildSrc = displayedChild[0].component.props.src

    if (displayedChildSrc && this.state.imagesSrcList.includes(displayedChildSrc)) {
      return this.updateSelectedImage(displayedChildSrc)
    }
  }

  renderVerticalList () {
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
    const combinedSrc = [...this.state.imagesSrcList, ...this.state.videosSrcList]
    const selectedIndex = combinedSrc.indexOf(this.state.selectedImageSrc)
    const orderedSrcs = rotate(combinedSrc, selectedIndex)

    return orderedSrcs.map((src, index) => {
      if (this.state.imagesSrcList.indexOf(src) !== -1) {
        return (
          <ListItemLightbox
            key={index}
            src={src} />
        )
      }
      if (this.state.videosSrcList.indexOf(src) !== -1) {
        return (
          <ListItemLightbox
            key={index}
            src={src}
            video />
        )
      }
    })
  }

  renderSelectedImage () {
    const items = this.renderImagesListLightbox()

    const imageStyle = {
      backgroundImage: `url(${this.state.selectedImageSrc})`
    }

    return (
      <Lightbox>

        <div
          style={imageStyle}
          className={style.selectedImageDesktopImage} />

        <SelectedImageLightboxContent
          onPositionChange={this.handleSelectedImageScrollerPositionChange.bind(this)}
          items={items} >
        </SelectedImageLightboxContent>

      </Lightbox>
    )
  }

  render () {
    return (
      <React.Fragment>

        <VerticalAlignHelper />

        <div
          className={style.selectedImageDesktop}>
          {this.renderSelectedImage()}
        </div>

        <ScrollableList
          numberToDisplay={3}
          touchMoveSensitivity={0.3}
          wrapperClassName={style.imagesListWrapperDesktop}
          buttonDown={<ButtonDown />}
          buttonUp={<ButtonUp />}
          reverseSwipeScroll
          vertical >
          {this.renderVerticalList()}
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

ProductContentImagesDesktop.propTypes = {
  featuredImageSrc: PropTypes.string,
  images: PropTypes.string.isRequired,
  videos: PropTypes.string
}

export default ProductContentImagesDesktop
