// @flow
import * as React from 'react'
import style from './ApplicationGalleryDetail.scss'

type Props = {

}

type State = {
  isHovered: boolean
}

class DownloadIconImage extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isHovered: false
    }
  }

  /**
   * Apply mouseover image to download arrow
   */

  onMouseEnter (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: true })
  }

  onMouseLeave (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: false })
  }

  render () {
    return (
      <div
        className={style.downloableImage}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
        {this.state.isHovered ? (
          <img
            src={require('../../../../images/download-arrow-icon/download-green@3x.png')}
          />
        ) : (
          <img
            src={require('../../../../images/download-arrow-icon/download@2x.png')}
          />
        )}
      </div>
    )
  }
}

export default DownloadIconImage
