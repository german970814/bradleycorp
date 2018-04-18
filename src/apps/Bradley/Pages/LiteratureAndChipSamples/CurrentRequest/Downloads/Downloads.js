// @flow
import * as React from 'react'
import type { DownloadTypes } from '../../LiteratureAndChipSamples'
import { download } from '../../LiteratureAndChipSamples'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import sharedStyle from '../CurrentRequest.scss'
import style from './Downloads.scss'

type Props = {
  downloads?: DownloadTypes,
  removeFromDownloads: (idToRemove: number) => void
}

class Downloads extends React.Component<Props> {
  onClickButton () {
    if (!this.props.downloads || !this.props.downloads.constructor === Array) {
      return
    }

    return this.props.downloads.forEach(literature => {
      return download(literature)
    })
  }

  renderLiterature () {
    if (
      !this.props.downloads ||
      !this.props.downloads.constructor === Array ||
      !this.props.downloads.length
    ) {
      return "You haven't added any Literature to downloads yet"
    }

    return this.props.downloads.map((download, index) => {
      return (
        <div key={index} className={style.download}>
          <div className={`small-body ${style.downloadTitle}`}>
            {download.post.post_title}
          </div>
          <div
            className={`${sharedStyle.removeWrapper} ${style.removeWrapper}`}
            onClick={() => this.props.removeFromDownloads(download.post.ID)}>
            <img
              src={require('../../../../../../images/remove/remove@2x.png')}
              className={style.remove}
            />
          </div>
        </div>
      )
    })
  }

  renderContent () {
    return (
      <React.Fragment>
        <h6 className={sharedStyle.title}>{'LITERATURE'}</h6>

        {this.renderLiterature()}

        <div className={style.buttonWrapper}>
          <button
            className={`button-orange ${style.button}`}
            onClick={this.onClickButton.bind(this)}>
            {'DOWNLOAD'}
          </button>
        </div>
      </React.Fragment>
    )
  }

  render () {
    return (
      <BCorpWidget
        title={'Your Downloads'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        {this.renderContent()}
      </BCorpWidget>
    )
  }
}

export default Downloads
