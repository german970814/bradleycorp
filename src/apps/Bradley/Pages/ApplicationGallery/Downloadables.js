// @flow
import React, { Component } from 'react'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import DownloadIconImage from './DownloadIconImage'
import DocumentPackagerApiClient from '../../../../api/bradley-apis/documentPackager_client'
import style from './ApplicationGalleryDetail.scss'
import type { BimProductVariant } from '../../../../api/bradley-apis/documentPackager_client'
import type { TechnicalInfo } from '../../../../lib/types/cpt_types'

type DownloadabeType = {
  title: string,
  files: Array<string>,
  handler: () => void
}

type DownloadableBimRevit = {
  title: string,
  files: Array<number>,
  handler: () => void
}

type DownloadableFormat = {
  tech: DownloadabeType,
  bim: { title: string, files: Array<number>, handler: () => void },
  all: DownloadabeType
}

type Props = {
  techs: Array<TechnicalInfo>,
  bim: Array<BimProductVariant>
}

type State = {
  selected: ?DownloadabeType | ?DownloadableBimRevit
}

export default class Downloadables extends Component<Props, State> {
  static defaultProps = {
    techs: [],
    bim: []
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      selected: null
    }
  }

  get downloadables (): DownloadableFormat {
    return {
      all: {
        title: 'All Documents',
        files: [],
        handler: () => {}
      },
      tech: {
        title: 'All Tech Data',
        files: this.props.techs.length ? this.props.techs.map(el => el.meta.technical_info_pdf) : [],
        handler: this.downloadTechData.bind(this)
      },
      bim: {
        title: 'All BIM/Revit',
        files: this.props.bim.length ? this.props.bim.map(el => el.id) : [],
        handler: this.downloadBimRevit.bind(this)
      }
    }
  }

  renderFileList () {
    if (!this.state.selected) {
      return
    }
    return <p>Do you want download {this.state.selected.title}?</p>
  }

  wrapperFunction (func: () => void, selected: DownloadabeType | DownloadableBimRevit) {
    this.setState({ selected }, func)
  }

  downloadBimRevit () {
    if (!this.state.selected) {
      return
    }
    const client = new DocumentPackagerApiClient()
    const files = this.downloadables.bim.files
    client.downloadFiles(files)
  }

  downloadTechData () {
    if (!this.state.selected) {
      return
    }
    this.downloadables.tech.files.forEach(file => {
      window.open(file, '_blank')
    })
  }

  downloadAll () {
    this.downloadBimRevit()
    this.downloadAll()
  }

  downloadFiles () {
    this.state.selected && this.state.selected.handler()
  }

  render () {
    return <LightboxV2
      renderChildren={openLightbox => {
        return Object.keys(this.downloadables).map((downloadable, index) => {
          return 0 in this.downloadables[downloadable].files ? <div key={index} onClick={
            e => this.wrapperFunction(openLightbox, this.downloadables[downloadable])} className={`${style.downloadLinkWrapper}`}>
            <DownloadIconImage/>
            <p className={`${style.downloableText}`}>{this.downloadables[downloadable].title}</p>
          </div> : null
        })
      }}
      renderLightboxContents={(closeLightBox) => {
        return <div>
          <div className={`${style.lightBoxListWrapper}`}>
            <LightboxTitleBannerContentBox title={'Confirm Download'}>
              <p className={`${style.lightBoxListWeight}`}>INCLUDED FILES</p>
              {this.renderFileList()}
              <p>Do you wish to continue?</p>
              <button onClick={this.downloadFiles.bind(this)} className={`${style.productListLightBoxButton}`}>Confirm</button>
              <button onClick={closeLightBox} className={`${style.productListLightBoxButton} ${style.productListLightBoxButtonRedBorder}`}>Cancel</button>
            </LightboxTitleBannerContentBox>
          </div>
        </div>
      }}
      onLightboxClose={() => {
        return undefined
      }}
      fitLightboxToContent
      maxWidth={'370px'}
    />
  }
}
