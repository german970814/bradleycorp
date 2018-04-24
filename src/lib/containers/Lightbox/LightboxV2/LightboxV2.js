// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import type { UpdateBlurType } from '../../../contexts/BlurContext'
import { BlurConsumer } from '../../../contexts/BlurContext'
import style from './LightboxV2.scss'

type Props = {
  /**
   * What to render as the entry to the lightbox.
   * This function is passed the openLightbox function as an argument
   * so you have flexibility over where to pass it.
   */
  renderChildren: (() => void) => React.Node,
  /**
   * What to render inside the lightbox when it's open
   */
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
  onLightboxClose?: () => void,
  /**
   * Lightbox will fit to size of the content passed
   * and close button will always stay the same distance underneath
   */
  fitLightboxToContent?: boolean,
  /**
   * Make the lightbox always stretch to the full width of the screen
   * (still with standard body padding on each side)
   */
  fullWidth?: boolean,
  /**
   * Max width for the lightbox. Pass any supported css value as a string.
   */
  maxWidth?: string
}

type InnerLightboxProps = Props & {
  updateBlur: UpdateBlurType
}

type State = {
  isOpen: boolean
}

/**
 * Updated version of the Lightbox Component.
 * We should use this wherever possible going forward.
 * At some point I want to get round to updating all components using Lightbox V1
 * to use V2 instead.
 *
 * Main difference is that this Lightbox component uses render props to
 * display the entry to the lightbox and the actual lightbox content.
 * It leads to a much smoother experience.
 *
 * We also have options such as 'fitLightboxToContent', 'fullWidth', and 'maxWidth' to give us
 * full control over how the lightbox is actually displayed.
 * Previously the lightbox was a fixed size with content filling the space
 * Ths caused problems when, for example, the lightbox content needed to be smaller
 * than the designated space and we wanted to close button to stay the same distance below.
 * With these options all combinations should be possible.
 */

class LightboxV2 extends React.Component<Props> {
  render () {
    return (
      <BlurConsumer>
        {({ isBlurred, updateBlur }) => {
          return <LightboxV2Inner updateBlur={updateBlur} {...this.props} />
        }}
      </BlurConsumer>
    )
  }
}

class LightboxV2Inner extends React.Component<InnerLightboxProps, State> {
  constructor (props: InnerLightboxProps) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  componentWillUnmount () {
    this.props.updateBlur(false)
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
    this.props.updateBlur(true)

    this.setState({
      isOpen: true
    })
  }

  closeLightbox () {
    if (this.props.onLightboxClose) {
      this.props.onLightboxClose()
    }
    this.props.updateBlur(false)

    this.setState({
      isOpen: false
    })
  }

  renderCloseButton () {
    return (
      <div
        className={style.closeButtonWrapper}
        onClick={this.closeLightbox.bind(this)}>
        <img
          className={style.closeButton}
          src={require('../../../../images/icon-close/icon-close@2x.png')}
        />
      </div>
    )
  }

  renderLightbox () {
    const lightboxNode = document.getElementById('lightbox')

    if (!lightboxNode) {
      console.warn('Couldnt find node with id lightbox in the DOM')
      return
    }

    const fitToContentClass = this.props.fitLightboxToContent
      ? style.fitLightboxToContent
      : ''

    const fullWidthClass = this.props.fullWidth ? style.fullWidth : ''

    if (this.state.isOpen) {
      return ReactDOM.createPortal(
        <div
          className={`${style.background} ${this.props.backgroundClass ||
            ''} ${fitToContentClass || ''} ${fullWidthClass || ''}`}
          onClick={this.closeLightbox.bind(this)}>
          <div className={`lightbox-wrapper ${style.lightboxWrapper}`}>
            <div
              onClick={e => {
                e.stopPropagation()
              }}
              style={{
                maxWidth: this.props.maxWidth
              }}
              className={`lightbox ${style.lightbox}`}>
              {this.props.renderLightboxContents()}
              {this.renderCloseButton()}
            </div>
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
