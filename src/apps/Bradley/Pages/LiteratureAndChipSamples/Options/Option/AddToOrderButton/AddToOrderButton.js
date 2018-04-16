// @flow
import * as React from 'react'
import style from './AddToOrderButton.scss'

type Props = {
  isMobile: boolean,
  postType?: 'literature' | 'chip'
}

type State = {
  isHovered: boolean
}

class AddToOrderButton extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { isHovered: false }
  }

  toggleHover () {
    this.setState({ isHovered: !this.state.isHovered })
  }

  hover () {
    this.setState({ isHovered: true })
  }

  hoverOff () {
    this.setState({ isHovered: false })
  }

  handleAddToShipmentClick () {
    console.log('click')
  }

  handleAddToDownloadsClick () {
    console.log('click')
  }

  renderAddToShipment () {
    return (
      <button
        className={`${style.iconButton} ${style.addToShipment}`}
        onClick={this.handleAddToShipmentClick.bind(this)}>
        <img
          className={style.shippingIcon}
          src={require('../../../../../../../images/shipping-icon/shipping-icon@2x.png')}
        />
      </button>
    )
  }

  renderAddToDownloads () {
    return (
      <button
        className={`button-orange ${style.iconButton} ${style.addToDownloads}`}
        onClick={this.handleAddToDownloadsClick.bind(this)}>
        <img
          className={style.downloadIcon}
          src={require('../../../../../../../images/download-icon/download-icon@2x.png')}
        />
      </button>
    )
  }

  renderShipmentOrDownloadMobile () {
    return (
      <div className={style.shipmentOrDownloadMobileContainer}>
        <div className={style.relativePosition}>
          {this.renderAddToShipment()}
          {this.renderAddToDownloads()}
          <div className={style.rightTriangle} />
        </div>
      </div>
    )
  }

  renderDesktop () {
    return null
  }

  renderMobile () {
    return this.props.postType === 'literature' ? (
      <React.Fragment>
        <div className={style.addButton} onClick={this.toggleHover.bind(this)}>
          <div className={style.addButtonLines} />
        </div>
        {this.state.isHovered ? this.renderShipmentOrDownloadMobile() : null}
      </React.Fragment>
    ) : (
      <div
        className={style.addButton}
        onClick={this.handleAddToShipmentClick.bind(this)}>
        <div className={style.addButtonLines} />
      </div>
    )
  }

  render () {
    return this.props.isMobile ? this.renderMobile() : this.renderDesktop()
  }
}

export default AddToOrderButton
