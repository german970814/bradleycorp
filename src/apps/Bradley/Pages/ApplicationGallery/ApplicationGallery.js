// @flow
import React, { Component } from 'react'
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

type GalleryType = {
  meta: MetaType,
  post: ApplicationGalleryPost,
  terms: TermsType
}

type State = {
  gallery: Array<GalleryType>,
  filters: Object,
  activeFilters: Array<string>
}

export default class ApplicationGallery extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      gallery: [],
      filters: {},
      activeFilters: []
    }
  }

  componentDidMount () {
    this.getApplicationGallery()
  }

  updateFilters (newFilters: any): void {
    this.setState({ filters: newFilters })
  }

  renderContent () {
    return (
      <div>
        <section id="sidebar">
          <ul>
            {'tax_names' in this.state.filters && this.state.filters.tax_names.map((el, idx) => {
              return (
                <ul key={idx}>
                  {this.state.filters[el].map((ele, ind) => {
                    return <li key={ind}><a onClick={() => this.toggleFilter(ele.slug)}>{ele.name}</a></li>
                  })}
                </ul>
              )
            })}
          </ul>
        </section>
        <Filters filters={{}} updateFilters={this.updateFilters.bind(this)} />
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

  toggleFilter (filter: string) {
    const indexOf = this.state.activeFilters.indexOf(filter)
    if (indexOf + 1) {
      const activeFilters = this.state.activeFilters
      activeFilters.splice(indexOf, 1)
      this.setState({ activeFilters })
    } else {
      this.setState({ activeFilters: [filter, ...this.state.activeFilters] })
    }
  }

  async getApplicationGallery () {
    const client = new CPTApiClient(PostType)
    const response = await client.getLatest(20)
    this.setState({
      gallery: response.data.map(post => {
        return post
      })
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
