// @flow
import * as React from 'react'
import type { LiteraturePost } from '../../../../../../../lib/types/cpt_types'
import { download } from '../../../LiteratureAndChipSamples'
import style from './DownloadIcon.scss'

type Props = {
  literature: LiteraturePost,
  isMobile: boolean
}

type State = {
  isHovered: boolean
}

class DownloadIcon extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isHovered: false
    }
  }

  onMouseEnter (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: true })
  }

  onMouseLeave (event: SyntheticMouseEvent<HTMLDivElement>) {
    this.setState({ isHovered: false })
  }

  onClick (event: SyntheticEvent<HTMLDivElement>) {
    return download(this.props.literature)
  }

  render () {
    return (
      <div
        className={style.downloadIconWrapper}
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
        {this.state.isHovered && !this.props.isMobile ? (
          <img
            src={require('../../../../../../../images/download-arrow-icon/download-green@3x.png')}
            className={style.downloadIcon}
          />
        ) : (
          <img
            className={style.downloadIcon}
            src={require('../../../../../../../images/download-arrow-icon/download@2x.png')}
          />
        )}
      </div>
    )
  }
}

export default DownloadIcon
