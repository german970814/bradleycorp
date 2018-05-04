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
    return this.state.selected ? this.state.selected.files.map((el, ind) => {
      return <p key={ind}>{el}</p>
    }) : null
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
          <LightboxTitleBannerContentBox title={'Please confirm your order'}>
            <div>
              {this.renderFileList()}
            </div>
          </LightboxTitleBannerContentBox>
        </div>
      }}
      onLightboxClose={() => {
        console.log('closed')
        return undefined
      }}
      fitLightboxToContent
      fullWidth={true}
      maxWidth={'500'}
    />
  }
}
