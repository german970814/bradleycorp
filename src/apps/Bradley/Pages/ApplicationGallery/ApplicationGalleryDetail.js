// @flow
import React, { Component } from 'react'
import type { GalleryType } from './ApplicationGallery'
import type { Location, Match } from 'react-router-dom'
import type { BCorpPost } from '../../../../lib/types/post_types'
import { PostType } from './ApplicationGallery'
import type { CPTName } from '../../../../lib/types/cpt_types'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'

type Props = {
  location: Location,
  match: Match
}

type State = {
  applicationGallery: ?GalleryType,
  loading: boolean,
  products?: Array<BCorpPost>,
  literatures?: Array<BCorpPost>
}

export default class ApplicationGallery extends Component<Props, State> {
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

  renderContent () {
    return (
      <div>
        {this.state.applicationGallery && (
          <ImageFrame
            src={this.state.applicationGallery.meta.app_gallery_img}
            aspectRatio={123 / 270}
            aspectRatioTablet={152 / 332}
            aspectRatioDesktop={169 / 370}
          />
        )}
        <p>
          {this.state.applicationGallery &&
            this.state.applicationGallery.post.post_content}
        </p>
        <h2>Featured Product Information</h2>
        <hr />
        <h3>Document Downloads</h3>
        <div className="row">
          <div className="col6" />
          <div className="col5">
            <h4>Product List</h4>
            <ul>
              {this.state.products &&
                this.state.products.map((product, ind) => {
                  return (
                    <li key={ind}>
                      <a>{product.post.post_title} </a>
                      <span>{product.meta.product_sku || ''}</span>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  async getApplicationGallery () {
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
          ? applicationGallery.terms['app_gallery_product_tag'].map(
            term => term.slug
          )
          : []

        this.getDocumentsDownloads(
          'product',
          'application_gallery',
          productTerms,
          products => {
            this.setState({ products }, () => {
              const terms =
                this.state.products && this.state.products.length
                  ? this.state.products
                    .map(product => {
                      return product.terms.literature &&
                          product.terms.literature.length
                        ? product.terms.literature.map(literature => {
                          return literature.slug
                        })
                        : []
                    })
                    .reduce((previous, current) => {
                      return [...previous, ...current]
                    })
                  : []
              console.log(terms)
              this.getDocumentsDownloads(
                'literature',
                'product_tag',
                terms,
                literatures => {
                  this.setState({ literatures })
                }
              )
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
    // app_gallery_tech_info_tag
    const client = new CPTApiClient(cpt)
    const response = await client.getByTaxAndTermArray(taxonomy, terms)
    callback && callback(response.data)
  }

  render () {
    return (
      <DefaultTemplate
        data={{ page_title: 'Application Gallery' }}
        renderModules={() => this.renderContent()}
        widgetsMoveWithScroll
      />
    )
  }
}
