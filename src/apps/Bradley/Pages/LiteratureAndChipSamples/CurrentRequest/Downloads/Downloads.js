// @flow
import * as React from 'react'
import type { DownloadTypes } from '../../LiteratureAndChipSamples'
import { download } from '../../LiteratureAndChipSamples'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
import DocumentPackagerApiClient from '../../../../../../api/bradley-apis/documentPackager_client'
import sharedStyle from '../CurrentRequest.scss'
import style from './Downloads.scss'

type Props = {
  downloads?: DownloadTypes,
  removeFromDownloads: (idToRemove: number) => void
};

class Downloads extends React.Component<Props> {
  onClickButton () {
    if (!this.props.downloads || !this.props.downloads.constructor === Array) {
      return
    }
    let _downloads = []
    this.props.downloads.forEach(literature => {
      if ( !literature.meta && !literature.meta.literature_pdf )
        return null;

      const pdfUrlHasId = literature.meta.literature_pdf.match(/[0-9]*$/);
      const pdfId  = (null !== pdfUrlHasId) ? pdfUrlHasId[0] : 0

      _downloads = [..._downloads, pdfId]

    })

    const docPackager = new DocumentPackagerApiClient();
    docPackager.downloadMediaFiles( _downloads )
  }

  renderLiterature () {

    if (
      !this.props.downloads ||
      !this.props.downloads.constructor === Array ||
      !this.props.downloads.length
    ) {
      return 'You haven’t added any Literature yet.'
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
        className={`col1 col2-tablet col1-desktop ${sharedStyle.widget}`}
        twoColsOnTablet>
        {this.renderContent()}
      </BCorpWidget>
    )
  }
}

export default Downloads
