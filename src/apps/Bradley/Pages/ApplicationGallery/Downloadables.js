// @flow
import React, { Component } from 'react'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import DownloadIconImage from './DownloadIconImage'
import DocumentPackagerApiClient from '../../../../api/bradley-apis/documentPackager_client'
import style from './ApplicationGalleryDetail.scss'
import type { BimRevitProductVariants } from './ApplicationGalleryDetail'
import type { TechnicalInfo } from '../../../../lib/types/cpt_types'

type DownloadabeType = {
  title: string,
  files: Array<string>
}

type Props = {
  techs: Array<TechnicalInfo>,
  bim: Array<BimRevitProductVariants>
}

type State = {
  selected: ?DownloadabeType
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

  get downloadables () {
    return {
      all: {
        title: 'All Documents',
        files: this.props.techs.length ? [this.props.techs[0].meta.technical_info_pdf] : []
      },
      tech: {
        title: 'All Tech Data',
        files: this.props.techs.length ? this.props.techs.map(el => el.meta.technical_info_pdf) : []
      },
      bim: {
        title: 'All BIM/Revit',
        files: this.props.bim.length ? this.props.bim.map(el => el.meta.technical_info_pdf) : []
      }
    }
  }

  async getBimRevitFiles() {
    if (this.props.bim.length) {
      const client = new DocumentPackagerApiClient()
      const ids = this.props.bim.map(el => el.id)
      const response = await client.getBimFileZipFromVariantIds(ids)
      // response.data
    }
  }

  renderFileList () {
    return this.state.selected ? <ul>{this.state.selected.files.map((el, ind) => {
      return <li key={ind}>{el}</li>
    })}</ul> : null
  }

  wrapperFunction (func: () => void, selected: DownloadabeType) {
    this.setState({ selected })
    func()
  }

  downloadFiles () {
    if (this.state.selected) {
      window.location.href = this.state.selected.files[0]
    }
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
