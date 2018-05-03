// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './ApplicationGallery.scss'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import type { GalleryType } from './ApplicationGallery'

type Props = {
  applicationGallery: GalleryType
}

type State = {
  onHover: boolean
}

export default class GalleryItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      onHover: false
    }
  }

  hoverOn() {
    this.setState({ onHover: true })
  }

  hoverOff() {
    this.setState({ onHover: false })
  }
  
  render() {
    return <div 
      className={`${style.imageContainer}`}
      onMouseEnter={this.hoverOn.bind(this)}
      onMouseLeave={this.hoverOff.bind(this)}>
      <Link to={
        { pathname: `/application-gallery/${this.props.applicationGallery.post.post_name}`,
          state: { post: this.props.applicationGallery }
        }}>
        <ImageFrame
          src={this.props.applicationGallery.meta.app_gallery_img}
          aspectRatio={180 / 301}
          aspectRatioTablet={180 / 301}
          aspectRatioDesktop={180 / 301}
        />
        <div className={`${style.arrowContainer} ${this.state.onHover ? style.showArrow : style.hideArrow}`}>
          <img src={require('../../../../images/arrow/hover-corner.png')} />
          <div className={`${style.arrowWrapper}`}>
            <ArrowButton text={''} link={''} color={'white'}/>
          </div>
        </div>
      </Link>
    </div>
  }
}