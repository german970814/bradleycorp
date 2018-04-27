// @flow
import React, { Component } from 'react'
import debounce from 'debounce'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import type { ApplicationGalleryPost } from '../../../../lib/types/cpt_types'

const PostType = 'application-gallery'

type Props = {}

type MetaType = {
  app_gallery_img: string,
  app_gallery_img_filters: Object
}

type TermsType = {
  tax_names: Array<string>
}

type FiltersType = Array<string>

type GalleryType = {
  meta: MetaType,
  post: ApplicationGalleryPost,
  terms: TermsType
}

type State = {
  gallery: Array<GalleryType>,
  activeFilters: Object,
  loading: boolean
}

export default class ApplicationGallery extends Component<Props, State> {
  getApplicationGalleryDebounced: (props: Props) => void

  constructor (props: Props) {
    super(props)

    this.state = {
      gallery: [],
      activeFilters: {},
      loading: true
    }
    this.getApplicationGalleryDebounced = debounce(this.getApplicationGallery, 2000)
  }

  componentDidMount () {
    this.getApplicationGallery({})
  }

  updateFilters (tax: string, newFilters: FiltersType): void {
    let activeFilters = this.state.activeFilters
    if (!newFilters.length) {
      delete this.state.activeFilters[tax]
    } else {
      activeFilters = Object.assign(
        {}, activeFilters, { [tax]: newFilters }
      )
    }
    this.setState({ activeFilters, loading: true })
    this.getApplicationGalleryDebounced(activeFilters)
  }

  renderContent () {
    return (
      <div>
        <Filters updateFilters={this.updateFilters.bind(this)} />
        <FillColumns colClasses={['col4', 'col4', 'col4']}>
          {this.state.gallery.map((el, idx) => {
            return <ImageFrame
              src={el.meta.app_gallery_img}
              key={idx}
              aspectRatio={123 / 270}
              aspectRatioTablet={152 / 332}
              aspectRatioDesktop={169 / 370}
            />
          })}
        </FillColumns>
      </div>
    )
  }

  async getApplicationGallery (filters: Props) {
    const client = new CPTApiClient(PostType)
    const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')
    this.setState({
      gallery: response.data.map(post => {
        return post
      }),
      loading: false
    })
  }

  render () {
    return <DefaultTemplate
      data={{ page_title: 'Application Gallery' }}
      renderModules={() => this.renderContent()}
      widgetsMoveWithScroll
    />
  }
}

export {
  PostType
}

export type {
  FiltersType
}
