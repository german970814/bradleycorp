// @flow
import React, { Component } from 'react'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import DownloadIconImage from './DownloadIconImage'
import style from './ApplicationGalleryDetail.scss'

import type { TechnicalInfo } from '../../../../lib/types/cpt_types'

type DownloadabeType = {
  title: string,
  files: Array<string>
}

type Props = {
  techs: Array<TechnicalInfo>,
  bim: Array<TechnicalInfo>
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

  renderFileList () {
    return this.state.selected ? <ul>{this.state.selected.files.map((el, ind) => {
      return <li key={ind}>{el}</li>
    })}</ul> : null
  }

  wrapperFunction (func: () => void, selected: DownloadabeType) {
    this.setState({ selected })
    func()
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
      renderLightboxContents={() => {
        return <div>
          <div className={`${style.lightBoxListWrapper}`}>
            <LightboxTitleBannerContentBox title={'Confirm Download'}>
              <p className={`${style.lightBoxListWeight}`}>INCLUDED FILES</p>
              {this.renderFileList()}
              <p>Do you wish to continue?</p>
              <button className={`${style.productListLightBoxButton}`}>Confirm</button>
              <button className={`${style.productListLightBoxButton} ${style.productListLightBoxButtonRedBorder}`}>Cancel</button>
            </LightboxTitleBannerContentBox>
          </div>
        </div>
      }}
      onLightboxClose={() => {
        console.log('closed')
        return undefined
      }}
      fitLightboxToContent
      maxWidth={'370px'}
    />
  }
}
