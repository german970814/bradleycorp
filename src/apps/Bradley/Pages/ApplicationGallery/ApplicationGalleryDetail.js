// @flow
import React, { Component } from 'react'
import type { GalleryType } from './ApplicationGallery'
import type { Location, Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../lib/types/post_types'
import { PostType } from './ApplicationGallery'
import type { CPTName } from '../../../../lib/types/cpt_types'
import {renderTitle} from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import CPTApiClient from '../../../../api/cpt_client'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './ApplicationGalleryDetail.scss'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import Downloadables from './Downloadables'
import ProductList from './ProductList'

type Props = {
  location: Location,
  match: Match
}

type State = {
  applicationGallery: ?GalleryType,
  loading: boolean,
  products?: Array<BCorpPost>,
  literatures?: Array<BCorpPost>,
  techs?: Array<BCorpPost>
}

export default class ApplicationGalleryDetail extends Component<Props, State> {
  CPT_TAXONOMY = {
    literature: 'product_tag',
    product: 'application_gallery',
    'technical-info': 'technical_info_product_tag'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      loading: true,
      applicationGallery: null
    }
  }

  componentDidMount () {
    this.getApplicationGallery()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getApplicationGallery()
    }
  }

  get_taxonomy_by_cpt(type: CPTName): string {
    return this.CPT_TAXONOMY[type]
  }

  renderContent () {
    return <div className={`${style.appGalleryDetailWrapper}`}>
      {this.state.applicationGallery && <ImageFrame
        src={this.state.applicationGallery.meta.app_gallery_img}
        aspectRatio={123 / 270}
        aspectRatioTablet={152 / 332}
        aspectRatioDesktop={169 / 370}
      />}
      <p className={`${style.appGalleryDetailText}`}>{this.state.applicationGallery && this.state.applicationGallery.post.post_content}</p>
      <div className={`col1 ${style.appGalleryDetailTitle}`}>
        <h2>Featured Product Information</h2>
      </div>
      {/* {this.getLightbox()} */}
      <div className="row">
        <div className={`col1 col2-tablet ${style.featureProductInformation}`}>
          <h3>Document Downloads</h3>
          <Downloadables techs={this.state.techs || null} bim={null} />
        </div>
        <div className={`col1 col2-tablet ${style.featureProductInformation}`}>
          <h3>Product List</h3>
          <ProductList products={this.state.products} literatures={this.state.literatures} />
        </div>
      </div>
    </div>
  }

  getTermsByTaxonomy (taxonomy: string): Array<string> {
    return this.state.products.map(product => {
      return product.terms[taxonomy].map(term => {
        return term.slug
      })
    }).reduce((previous, current) => {
      return [...previous, ...current]
    })
  }

  getLiteratures () {
    const cpt = 'literature'
    const terms = this.getTermsByTaxonomy(cpt)

    this.getDocumentsDownloads(cpt, this.get_taxonomy_by_cpt(cpt), terms, (literatures: Array<BCorpPost>) => {
      console.log(literatures)
      this.setState({ literatures })
    })
  }

  getTechInfo () {
    const cpt = 'technical-info'
    const terms = this.getTermsByTaxonomy('technical_info')

    this.getDocumentsDownloads(cpt, this.get_taxonomy_by_cpt(cpt), terms, (techs: Array<BCorpPost>) => {
      console.log(techs)
      this.setState({ techs })
    })
  }

  getBimRevit () {
    // const terms = this.getTermsByTaxonomy('bim_revit')
    // this.getDocumentsDownloads('')
  }

  async getApplicationGallery() {
    let applicationGallery: GalleryType

    if (this.props.location.state && this.props.location.state.post) {
      applicationGallery = this.props.location.state.post
    } else {
      const client = new CPTApiClient(PostType)
      const response = await client.getBySlug(
        this.props.match.params.slug || ''
      )
      applicationGallery = response.data
      console.log(response.data)
    }

    this.setState({ applicationGallery }, () => {
      if (this.state.applicationGallery) {
        const productTerms = applicationGallery.terms['app_gallery_product_tag']
          ? applicationGallery.terms['app_gallery_product_tag'].map(term => term.slug) : []

        this.getDocumentsDownloads(
          'product', this.get_taxonomy_by_cpt('product'),
          productTerms, (products: Array<BCorpPost>) => {
            console.log(products)
            this.setState({ products }, () => {
              this.getLiteratures()
              this.getTechInfo()
            })
          }
        )
      }
    })
  }

  async getDocumentsDownloads (
    cpt: CPTName,
    taxonomy: string,
    terms: Array<string>,
    callback?: (param: any) => void
  ) {
    const client = new CPTApiClient(cpt)
    const response = await client.getByTaxAndTermArray(taxonomy, terms)
    callback && callback(response.data)
  }

  render () {
    return (
      <div className={`row ${defaultStyle.defaultTemplate}`}>
          {renderTitle('Application Gallery', 'col1')}
          {this.renderContent()}
      </div>
    )
  }
}
