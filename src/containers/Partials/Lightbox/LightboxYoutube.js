import React from 'react'
import Lightbox from './Lightbox'
import style from './Lightbox.scss'

class LightboxYoutube extends Lightbox { // extends Lightbox and adds openLightbox to the onPlay event
  constructor (props) {
    super(props)

    this.renderChildrenWithYoutubeApi = this.renderChildrenWithYoutubeApi.bind(this)
  }

  getChildrenWithLightboxContentRemoved () {
    const children = React.Children.toArray(this.props.children)
    children.pop()
    return children
  }

  renderChildrenWithYoutubeApi () { // this expects children to be YouTube components from react-youtube
    return React.Children.map(this.getChildrenWithLightboxContentRemoved(), child => {
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
