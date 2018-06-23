// @flow
import React, { Component } from 'react'
import type { ScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import type { BCorpPost, BCorpMeta } from '../../../../lib/types/post_types'
import type {
  ApplicationGalleryPost,
  CPTName
} from '../../../../lib/types/cpt_types'
import type { TaxAndTermSlugObject } from '../../../../api/cpt_client'
import type { CheckboxesType } from '../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import debounce from 'debounce'
import { withScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import style from './ApplicationGallery.scss'
import GalleryItem from './GalleryItem'
import BCorpHead from '../../../../lib/components/BCorpHead/BCorpHead'
import Loading from '../../../../lib/components/Loading/Loading'
import NoResults from '../../../../lib/components/Error/NoResults/NoResults'

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

type Props = {
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  gallery: ?Array<GalleryType>,
  activeFilters: TaxAndTermSlugObject,
  loading: boolean
}

const PostType: CPTName = 'application-gallery'

export const pageTitle = 'Application Gallery'
export const pageDescription = ''

class ApplicationGallery extends Component<Props, State> {
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
    return this.state.gallery && !this.state.loading ? (
      this.state.gallery.map((appGallery, idx) => {
        return <GalleryItem key={idx} applicationGallery={appGallery} />
      })
    ) : (
      <Loading />
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
    return (
      <div className={`row ${defaultStyle.defaultTemplate}`}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        {renderTitle(pageTitle, 'col1')}
        <div className={`col1 col4-tablet ${style.appGallerySidebar}`}>
          <Filters
            activeFilters={this.state.activeFilters}
            updateActiveFilters={this.updateActiveFilters.bind(this)}
          />
        </div>
        <div className={`col1 col4x3-tablet ${style.appGalleryContent}`}>
          {this.props.screenSize === 'mobile' && this.renderColumns('col2')}
          {this.props.screenSize === 'tablet' &&
            this.renderColumns('col2-tablet')}
          {this.props.screenSize === 'desktop' && this.renderColumns('col3')}
        </div>
      </div>
    )
  }

  async getApplicationGallery (filters: TaxAndTermSlugObject) {
    let gallery: ?Array<GalleryType>

    try {
      const client = new CPTApiClient(PostType)
      const response = await client.getByTaxNameAndTermSlugObject(
        filters,
        'OR',
        -1
      )

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

export default withScreenSize(ApplicationGallery)
