import React from 'react'
import Lightbox from './Lightbox'
import style from './Lightbox.scss'

class LightboxYoutube extends Lightbox {
  constructor (props) {
    super(props)

    this.renderChildrenWithYoutubeApi = this.renderChildrenWithYoutubeApi.bind(this)
  }

  renderChildrenWithYoutubeApi () { // this expects child to be a YouTube component from react-youtube
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        onPlay: this.onPlay.bind(this)
      })
    })
  }

  onPlay (e) {
    e.target.pauseVideo()
    this.openLightbox()
  }

  render () {
    return (
      <div
        className={style.childWrapper}
        onClick={(e) => this.toggleOpen(e)}>
        {this.renderChildrenWithYoutubeApi()}
        {this.renderLightbox()}
      </div>
    )
  }
}

export default LightboxYoutube
