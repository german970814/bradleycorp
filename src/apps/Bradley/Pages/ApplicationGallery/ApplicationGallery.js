// @flow
import React, { Component } from 'react'
import type { BCorpPost, BCorpMeta } from '../../../../lib/types/post_types'
import type {
  ApplicationGalleryPost,
  CPTName
} from '../../../../lib/types/cpt_types'
import type { TaxAndTermSlugObject } from '../../../../api/cpt_client'
import type { CheckboxesType } from '../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import debounce from 'debounce'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import style from './ApplicationGallery.scss'
import GalleryItem from './GalleryItem'
import NoResults from '../../../../lib/components/NoResults/NoResults'

const PostType: CPTName = 'application-gallery'

type MetaType = BCorpMeta & {
  app_gallery_img?: string,
  app_gallery_img_filters?: {
    color: string,
    market: string,
    shape: string
  }
}

type GalleryType = BCorpPost & {
  post: ApplicationGalleryPost,
  meta: MetaType
}

type Props = {}

type State = {
  gallery: ?Array<GalleryType>,
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
      loading: true,
      hover: false
    }
    this.getApplicationGalleryDebounced = debounce(
      this.getApplicationGallery,
      2000
    )
  }

  componentDidMount () {
    this.getApplicationGallery({})
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (this.shouldResendRequest(prevState)) {
      this.getApplicationGalleryDebounced(this.state.activeFilters)
    }
  }

  updateActiveFilters (tax: string, newFilters: CheckboxesType): void {
    let activeFilters: TaxAndTermSlugObject = this.state.activeFilters
    if (!newFilters.length) {
      delete activeFilters[tax]
    } else {
      activeFilters = Object.assign({}, activeFilters, {
        [tax]: newFilters
      })
    }
    this.setState({ activeFilters, loading: true })
  }

  renderGallery () {
    return this.state.gallery ? (
      this.state.gallery.map((appGallery, idx) => {
        return <GalleryItem key={idx} applicationGallery={appGallery} />
      })
    ) : (
      <div />
    )
  }

  renderNoResults () {
    return (
      <NoResults
        message={'No images match your filter selections'}
        className={style.noResults}
      />
    )
  }

  renderColumns (classes: string) {
    return this.state.gallery === null ? (
      this.renderNoResults()
    ) : (
      <FillColumns
        colClasses={[
          `${classes} ${style.appGalleryItem} ${style.appMinHeightGalleryItem}`,
          `${classes} ${style.appGalleryItem}`,
          `${classes} ${style.appGalleryItem}`
        ]}>
        {this.renderGallery()}
      </FillColumns>
    )
  }

  render () {
    console.log(this.state)
    return (
      <div className={`row ${defaultStyle.defaultTemplate}`}>
        {renderTitle('Application Gallery', 'col1')}
        <div className={`col1 col4-tablet ${style.appGallerySidebar}`}>
          <Filters
            activeFilters={this.state.activeFilters}
            updateActiveFilters={this.updateActiveFilters.bind(this)}
          />
        </div>
        <div className={`col1 col4x3-tablet ${style.appGalleryContent}`}>
          <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
            {match =>
              match ? (
                // mobile
                this.renderColumns('col2')
              ) : (
                <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                  {match =>
                    match
                      ? this.renderColumns('col2-tablet')
                      : this.renderColumns('col3')
                  }
                </Media>
              )
            }
          </Media>
        </div>
      </div>
    )
  }

  async getApplicationGallery (filters: TaxAndTermSlugObject) {
    let gallery: ?Array<GalleryType>

    try {
      const client = new CPTApiClient(PostType)
      const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

      gallery = response.data.length ? response.data : null
    } catch (e) {
      console.log(e)
      gallery = null
    }

    this.setState({
      gallery,
      loading: false
    })
  }

  shouldResendRequest (prevState: State) {
    return Object.keys(prevState.activeFilters).some(filter => {
      return (
        prevState.activeFilters[filter] !== this.state.activeFilters[filter]
      )
    })
  }
}

export { PostType }

export type { CheckboxesType, GalleryType }
