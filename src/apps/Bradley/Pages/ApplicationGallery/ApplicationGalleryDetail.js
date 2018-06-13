// @flow
import React, { Component } from 'react'
import ProductList from './ProductList'
import Downloadables from './Downloadables'
import { PostType } from './ApplicationGallery'
import CPTApiClient from '../../../../api/cpt_client'
import Loading from '../../../../lib/components/Loading/Loading'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'

import style from './ApplicationGalleryDetail.scss'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'

import type { GalleryType } from './ApplicationGallery'
import type { Location, Match } from 'react-router-dom'
import type {
  CPTName,
  ProductPost,
  LiteraturePost,
  TechnicalInfo
} from '../../../../lib/types/cpt_types'

type Props = {
  location: Location,
  match: Match
}

type State = {
  loading: boolean,
  applicationGallery: ?GalleryType,
  products: Array<ProductPost>,
  literatures: ?Array<LiteraturePost>,
  techs: ?Array<TechnicalInfo>
}

export default class ApplicationGalleryDetail extends Component<Props, State> {
  // Dictionary to match CPT names with Taxonomies
  CPT_TAXONOMY = {
    literature: 'product_tag',
    product: 'application_gallery',
    'technical-info': 'technical_info_product_tag'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      loading: true,
      applicationGallery: null,
      products: [],
      literatures: [],
      techs: []
    }
  }

  componentDidMount () {
    this.getApplicationGallery()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getApplicationGallery()
    }
  }

  /**
   * Return taxonomy given a CPTName
   * Taxonomies are consulting on CPT_TAXONOMY
   */
  getTaxonomyByCPT (type: CPTName): string {
    return this.CPT_TAXONOMY[type]
  }

  renderContent () {
    return (
      <div className={`${style.appGalleryDetailWrapper}`}>
        {this.state.applicationGallery && (
          <ImageFrame
            src={this.state.applicationGallery.meta.app_gallery_img || ''}
            aspectRatio={123 / 270}
            aspectRatioTablet={152 / 332}
            aspectRatioDesktop={169 / 370}
          />
        )}
        <p className={`${style.appGalleryDetailText}`}>
          {this.state.applicationGallery &&
            this.state.applicationGallery.post.post_content}
        </p>
        <div className={`col1 ${style.appGalleryDetailTitle}`}>
          <h2>Featured Product Information</h2>
        </div>
        <div className="row">
          <div
            className={`col1 col2-tablet ${style.featureProductInformation}`}>
            <h3>Document Downloads</h3>
            {this.downloadableContainer}
          </div>
          <div
            className={`col1 col2-tablet ${style.featureProductInformation}`}>
            <h3>Product List</h3>
            {this.productListContainer}
          </div>
        </div>
      </div>
    )
  }

  /**
   * Wrapper of downloadables with loading
   */
  get downloadableContainer () {
    const { techs } = this.state
    if (techs) {
      return techs.length ? (
        <Downloadables techs={techs} bim={[]} />
      ) : (
        <Loading />
      )
    }
    return null
  }

  /**
   * Wrapper of product list with loading
   */
  get productListContainer () {
    const { products, literatures } = this.state
    if (products && literatures) {
      return products.length || literatures.length ? (
        <ProductList products={products} literatures={literatures} />
      ) : (
        <Loading />
      )
    }
    return null
  }

  /**
   * Return product terms slugs given a taxonomy,
   * data comes from products in state
   *
   * Note: Products should be type Array<ProductPost>
   * @param {String} taxonomy
   * @return {Array<String>}
   */
  getProductTermsByTaxonomy (taxonomy: string): Array<string> {
    const products = 'products' in this.state ? this.state.products : []
    return products
      .map(product => {
        return product.terms[taxonomy].map(term => {
          return term.slug
        })
      })
      .reduce((previous, current) => {
        return [...previous, ...current]
      })
  }

  /**
   * Get literatures cpt and set it on state
   */
  getLiteratures () {
    const cpt = 'literature'
    const terms = this.getProductTermsByTaxonomy(cpt)

    try {
      this.getDocumentsDownloads(
        cpt,
        this.getTaxonomyByCPT(cpt),
        terms,
        (literatures: Array<LiteraturePost>) => {
          this.setState({ literatures })
        }
      )
    } catch (e) {
      console.log(e)
      this.setState({ literatures: null })
    }
  }

  /**
   * Get technical information cpt and set it on state
   */
  getTechInfo () {
    const cpt = 'technical-info'
    const terms = this.getProductTermsByTaxonomy('technical_info')

    try {
      this.getDocumentsDownloads(
        cpt,
        this.getTaxonomyByCPT(cpt),
        terms,
        (techs: Array<TechnicalInfo>) => {
          this.setState({ techs })
        }
      )
    } catch (e) {
      console.log(e)
      this.setState({ techs: null })
    }
  }

  /**
   * Get BIM/Revit cpt and set it on state
   */
  getBimRevit () {
    // soon
  }

  /**
   * Get the application gallery details to show in front,
   * Can get this info from two ways:
   *
   * 1. Location state: is the most fast way, when user
   * comes from application-gallery and select show details.
   * Data is charged from application-gallery, so, no need
   * request to server to get again
   *
   * 2. By url param slug: Get slug from url, given a beautiful
   * url, and request server with that slug to get info about
   * application gallery
   */
  async getApplicationGallery () {
    let applicationGallery: GalleryType

    if (this.props.location.state && this.props.location.state.post) {
      applicationGallery = this.props.location.state.post
    } else {
      try {
        const client = new CPTApiClient(PostType)
        const response = await client.getBySlug(
          this.props.match.params.slug || ''
        )
        applicationGallery = response.data
      } catch (exception) {
        console.log(exception)
        return
      }
    }

    this.setState({ applicationGallery }, () => {
      const productTerms = applicationGallery.terms['app_gallery_product_tag']
        ? applicationGallery.terms['app_gallery_product_tag'].map(
          term => term.slug
        )
        : []
      const cpt: CPTName = 'product'
      this.getDocumentsDownloads(
        cpt,
        this.getTaxonomyByCPT(cpt),
        productTerms,
        (products: Array<ProductPost>) => {
          this.setState({ products }, () => {
            this.getLiteratures()
            this.getTechInfo()
            this.getBimRevit()
          })
        }
      )
    })
  }

  /**
   * Method to request documents given a cpt, terms and taxonomy,
   * this method calls a callback with server response as parameter
   *
   * @param {String} cpt
   * @param {String} taxonomy
   * @param {Array<string>} terms
   * @param {Function} callback
   */
  async getDocumentsDownloads (
    cpt: CPTName,
    taxonomy: string,
    terms: Array<string>,
    callback: (param: any) => void
  ) {
    const client = new CPTApiClient(cpt)
    try {
      const response = await client.getByTaxAndTermArray(taxonomy, terms)
      callback(response.data)
    } catch (e) {
      console.log(e)
    }
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
