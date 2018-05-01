// @flow
import React, { Component } from 'react'
import debounce from 'debounce'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import type { ApplicationGalleryPost } from '../../../../lib/types/cpt_types'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import style from './ApplicationGallery.scss'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'

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

  renderGallery () {
    return this.state.gallery.map((el, idx) => {
      return <ImageFrame
        src={el.meta.app_gallery_img}
        key={idx}
        aspectRatio={123 / 270}
        aspectRatioTablet={152 / 332}
        aspectRatioDesktop={169 / 370}
      />
    })
  }

  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate}`}>
        {renderTitle('Application Gallery', 'col1')}
        <div className={`col1 col4-tablet sidebar ${style.appGallerySidebar}`}>
          <Filters updateFilters={this.updateFilters.bind(this)} />
        </div>
        <div className={`col1 col4x3-tablet ${style.appGalleryContent}`}>
          <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
            {match =>
              match ? (
              // mobile
                <FillColumns colClasses={[`col2 ${style.horizontalRightItemSpace} ${style.appGalleryItem}`, `${style.horizontalLeftItemSpace} col2 ${style.appGalleryItem}`]}>
                  {this.renderGallery()}
                </FillColumns>
              ) : (
                <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                  {match =>
                    match ? (
                    // tablet
                      <FillColumns colClasses={[`col2-tablet ${style.horizontalRightItemSpace} ${style.appGalleryItem}`, `${style.horizontalLeftItemSpace}  col2-tablet ${style.appGalleryItem}`]}>
                        {this.renderGallery()}
                      </FillColumns>
                    ) : (
                    // desktop
                      <FillColumns colClasses={[`col3 ${style.horizontalRightItemSpace} ${style.appGalleryItem}`, `${style.horizontalLeftItemSpace} col3`, `${style.lastHorizontalLeftItemSpace} col3`]}>
                        {this.renderGallery()}
                      </FillColumns>
                    )
                  }
                </Media>
              )
            }
          </Media>
        </div>
      </div>
    )
  }
}

export {
  PostType
}

export type {
  FiltersType
}
