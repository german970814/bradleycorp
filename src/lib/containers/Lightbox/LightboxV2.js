// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import LightboxCloseButton from './LightboxCloseButton'
import VerticalAlignHelper from '../../components/VerticalAlignHelper/VerticalAlignHelper'
import style from './Lightbox.scss'

type Props = {
  renderChildren: (() => void) => React.Node,
  renderLightboxContents: () => React.Node,
  /**
   * Custom css class for the lightbox background
   */
  backgroundClass?: string,
  /**
   * Can pass a listener to the close button on click event
   */
  closeButtonOnClick?: () => void,
  /**
   * Can pass a listener to lightbox open event
   */
  onLightboxOpen?: () => void,
  /**
   * Can pass a listener to lightbox close event
   */
  onLightboxClose?: () => void
}

type State = {
  isOpen: boolean
}

class LightboxV2 extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggleOpen () {
    if (!this.state.isOpen) {
      return this.openLightbox()
    }
    this.closeLightbox()
  }

  openLightbox () {
    if (this.props.onLightboxOpen) {
      this.props.onLightboxOpen()
    }

    this.setState({
      isOpen: true
    })
  }

  closeLightbox () {
    if (this.props.onLightboxClose) {
      this.props.onLightboxClose()
    }

    this.setState({
      isOpen: false
    })
  }

  renderLightbox () {
    const lightboxNode = document.getElementById('lightbox')

    if (!lightboxNode) {
      console.warn('Couldnt find node with id lightbox in the DOM')
      return
    }

    if (this.state.isOpen) {
      return ReactDOM.createPortal(
        <div
          className={`${style.background} ${this.props.backgroundClass || ''}`}
          onClick={this.closeLightbox.bind(this)}>
          <VerticalAlignHelper />

          <div className={style.lightbox}>
            {this.props.renderLightboxContents()}

            <LightboxCloseButton onClick={this.closeLightbox.bind(this)} />
          </div>
        </div>,
        lightboxNode
      )
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.props.renderChildren(this.openLightbox.bind(this))}
        {this.renderLightbox()}
      </React.Fragment>
    )
  }
}

export default LightboxV2
