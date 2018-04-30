// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../lib/types/post_types'
import type {
  ApplicationGalleryPost,
  CPTName
} from '../../../../lib/types/cpt_types'
import debounce from 'debounce'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'

const PostType: CPTName = 'application-gallery'

type Props = {}

/**
 * This is the object shape that our function getByTaxNameAndTermSlugObject requires.
 *
 * Note, it will always have a tax name (string) as key,
 * and an array of tax slugs (Array<string>) as values.
 * BUT, we've allowed the object to be empty for getting all posts.
 */
type TaxAndTermSlugObject = {
  [string]: ?Array<string>
}

type MetaType = {
  app_gallery_img: string,
  app_gallery_img_filters: {
    color: string,
    market: string,
    shape: string
  }
}

type FiltersType = Array<string>

type GalleryType = {
  post: ApplicationGalleryPost,
  meta: MetaType
} & BCorpPost

type State = {
  gallery: Array<GalleryType>,
  activeFilters: TaxAndTermSlugObject,
  loading: boolean
}

export default class ApplicationGallery extends Component<Props, State> {
  getApplicationGalleryDebounced: (filters: TaxAndTermSlugObject) => void

  constructor (props: Props) {
    super(props)

    this.state = {
      gallery: [],
      activeFilters: {},
      loading: true
    }
    this.getApplicationGalleryDebounced = debounce(
      this.getApplicationGallery,
      2000
    )
  }

  componentDidMount () {
    this.getApplicationGallery({})
  }

  updateFilters (tax: string, newFilters: FiltersType): void {
    let activeFilters: TaxAndTermSlugObject = this.state.activeFilters
    if (!newFilters.length) {
      delete activeFilters[tax]
    } else {
      activeFilters = Object.assign({}, activeFilters, {
        [tax]: newFilters
      })
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
            return (
              <ImageFrame
                src={el.meta.app_gallery_img}
                key={idx}
                aspectRatio={123 / 270}
                aspectRatioTablet={152 / 332}
                aspectRatioDesktop={169 / 370}
              />
            )
          })}
        </FillColumns>
      </div>
    )
  }

  async getApplicationGallery (filters: TaxAndTermSlugObject) {
    const client = new CPTApiClient(PostType)
    const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

    const gallery: Array<GalleryType> = response.data

    this.setState({
      gallery,
      loading: false
    })
  }

  render () {
    console.log(this.state)
    return (
      <DefaultTemplate
        data={{ page_title: 'Application Gallery' }}
        renderModules={() => this.renderContent()}
        widgetsMoveWithScroll
      />
    )
  }
}

export { PostType }

export type { FiltersType, GalleryType }
