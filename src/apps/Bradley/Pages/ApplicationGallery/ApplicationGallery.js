// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../lib/types/post_types'
import type {ApplicationGalleryPost, CPTName} from '../../../../lib/types/cpt_types'
import debounce from 'debounce'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import Filters from './Filters/Filters'
import ImageFrame from '../../../../lib/components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import style from './ApplicationGallery.scss'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import ArrowButton from '../../../../lib/components/ArrowButton/ArrowButton'

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

  async getApplicationGallery (filters: Props) {
    const client = new CPTApiClient(PostType)
    const response = await client.getByTaxNameAndTermSlugObject(filters, 'OR')

    const gallery: Array<GalleryType> = response.data

    this.setState({
      gallery,
      loading: false
    })
  }

  renderGallery () {
    return this.state.gallery.map((el, idx) => {
      return <div key={idx} className={`${style.imageContainer}`}>
        <ImageFrame
          src={el.meta.app_gallery_img}
          aspectRatio={180 / 301}
          aspectRatioTablet={180 / 301}
          aspectRatioDesktop={180 / 301}
        />
        <ArrowButton text={''} link={''} color={'white'}/>
        </div>
    })
  }

  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate}`}>
        {renderTitle('Application Gallery', 'col1')}
        <div className={`col1 col4-tablet ${style.appGallerySidebar}`}>
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

export { PostType }

export type { FiltersType, GalleryType }
