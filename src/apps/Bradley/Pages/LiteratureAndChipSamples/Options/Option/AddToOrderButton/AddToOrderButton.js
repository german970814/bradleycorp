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
  constructor (props: Props) {
    super(props)

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

  handleAddToShipmentClick () {
    this.clickedOff()
    this.props.addToShipment(this.props.post)
  }

  handleAddToDownloadsClick () {
    this.clickedOff()
    this.props.addToDownloads(this.props.post)
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
    return this.state.isClicked ? (
      <React.Fragment>
        {this.renderAddToShipment()}
        {this.renderAddToDownloads()}
      </React.Fragment>
    ) : (
      <button
        className={`${style.addButtonDesktop}`}
        onClick={this.clicked.bind(this)}>
        {'ADD TO ORDER'}
      </button>
    )
  }

  renderMobile () {
    return this.props.post.post.post_type === 'literature' ? (
      <React.Fragment>
        <div
          className={style.addButton}
          onClick={this.toggleClicked.bind(this)}>
          <div className={style.addButtonLines} />
        </div>
        {this.state.isClicked ? this.renderShipmentOrDownloadMobile() : null}
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
