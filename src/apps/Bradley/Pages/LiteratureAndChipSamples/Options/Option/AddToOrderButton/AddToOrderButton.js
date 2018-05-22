// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../../lib/types/cpt_types'
import style from './AddToOrderButton.scss'

type Props = {
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  addToDownloads: (postToAdd: LiteraturePost) => void,
  isMobile: boolean,
  post: LiteraturePost | ChipSamplePost
}

type State = {
  isClicked: boolean
}

class AddToOrderButton extends React.Component<Props, State> {
  isPrintable: boolean
  postType: string

  constructor (props: Props) {
    super(props)

    this.isPrintable = this.isOptionPrintable()
    this.postType = this.props.post.post.post_type

    this.state = { isClicked: false }
  }

  toggleClicked () {
    this.setState({ isClicked: !this.state.isClicked })
  }

  clicked () {
    this.setState({ isClicked: true })
  }

  clickedOff () {
    this.setState({ isClicked: false })
  }

  showAdded () {
    this.clicked()
    setTimeout(() => {
      this.clickedOff()
    }, 2000)
  }

  handleAddToShipmentClick () {
    this.props.addToShipment(this.props.post)

    if (this.postType === 'literature') {
      this.clickedOff()
    } else {
      this.showAdded()
    }
  }

  handleAddToDownloadsClick () {
    this.showAdded()
    this.props.addToDownloads(this.props.post)
  }

  handleMobileClick () {
    if (this.isPrintable) {
      return this.toggleClicked()
    } else {
      return this.props.post.post.post_type === 'literature'
        ? this.handleAddToDownloadsClick()
        : this.handleAddToShipmentClick()
    }
  }

  handleDesktopClick () {
    if (this.isPrintable) {
      return this.clicked()
    } else {
      return this.props.post.post.post_type === 'literature'
        ? this.handleAddToDownloadsClick()
        : this.handleAddToShipmentClick()
    }
  }

  renderAddToShipment () {
    return (
      <button
        className={`${style.iconButton} ${style.addToShipment}`}
        onClick={this.handleAddToShipmentClick.bind(this)}>
        <div className={style.iconWrapper}>
          <div className={style.iconText}>{'SHIP'}</div>
          <img
            className={style.shippingIcon}
            src={require('../../../../../../../images/shipping-icon/shipping-icon@2x.png')}
          />
        </div>
      </button>
    )
  }

  renderAddToDownloads () {
    return (
      <button
        className={`button-orange ${style.iconButton} ${style.addToDownloads}`}
        onClick={this.handleAddToDownloadsClick.bind(this)}>
        <div className={style.iconWrapper}>
          <div className={style.iconText}>{'DOWNLOAD'}</div>
          <img
            className={style.downloadIcon}
            src={require('../../../../../../../images/download-icon/download-icon@2x.png')}
          />
        </div>
      </button>
    )
  }

  renderPopup () {
    const extraClass = !this.isPrintable && style.added
    const hideClass = !this.state.isClicked && style.hide
    return (
      <div
        className={`${style.shipmentOrDownloadMobileContainer} ${extraClass ||
          ''} ${hideClass || ''}`}>
        <div className={style.relativePosition}>
          {this.isPrintable ? (
            <React.Fragment>
              {this.renderAddToShipment()}
              {this.renderAddToDownloads()}
            </React.Fragment>
          ) : (
            <h5 className={style.added}>{'Added!'}</h5>
          )}
          <div className={style.rightTriangle} />
        </div>
      </div>
    )
  }

  renderDesktop () {
    return this.state.isClicked && this.isPrintable ? (
      <React.Fragment>
        {this.renderAddToShipment()}
        {this.renderAddToDownloads()}
      </React.Fragment>
    ) : (
      <button
        className={`${style.addButtonDesktop}`}
        onClick={this.handleDesktopClick.bind(this)}>
        {'ADD TO ORDER'}
      </button>
    )
  }

  renderMobile () {
    return (
      <React.Fragment>
        <div
          className={style.addButton}
          onClick={this.handleMobileClick.bind(this)}>
          <div className={style.addButtonLines} />
        </div>
        {this.renderPopup()}
      </React.Fragment>
    )
  }

  render () {
    return this.props.isMobile ? this.renderMobile() : this.renderDesktop()
  }

  isOptionPrintable (): boolean {
    if (this.postType !== 'literature') {
      return false
    } else {
      if (this.props.post.meta.can_print === '1') {
        return true
      } else {
        return false
      }
    }
  }
}

export default AddToOrderButton
