// @flow
import * as React from 'react'
import type { BCorpTermsResponse } from '../../../../lib/types/term_types'
import CPTApiClient from '../../../../api/cpt_client'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import Videos from './Videos/Videos'
import Filters from './Filters/Filters'
import style from './VideoGallery.scss'

type FiltersType = {
  video_gallery_type_cat: string,
  video_gallery_product_tag: string,
  search?: string
}

type FilterOptions = {
  [string | number]: ?string
}

type FilterOptionsState = {
  [string]: FilterOptions
}

type Props = {}

type State = {
  filters: FiltersType,
  filterOptions: FilterOptionsState
}

const filterDefault: 'all' = 'all'
const filterDefaultName: 'All' = 'All'
const filterOptionDefault: FilterOptions = {}
filterOptionDefault[filterDefault] = filterDefaultName

class VideoGallery extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {
        video_gallery_type_cat: filterDefault,
        video_gallery_product_tag: filterDefault,
        search: ''
      },
      filterOptions: {
        video_gallery_type_cat: filterOptionDefault,
        video_gallery_product_tag: filterOptionDefault
      }
    }
  }

  componentDidMount () {
    this.getTerms()
  }

  updateFilters (filters: FiltersType) {
    this.setState({ filters })
  }

  render () {
    console.log(this.state)
    return (
      <DefaultTemplate
        data={{ page_title: 'Video Gallery' }}
        renderModules={() => {
          return (
            <div className={style.VideoGallery}>
              <Filters
                filters={this.state.filters}
                filterOptions={this.state.filterOptions}
                updateFilters={this.updateFilters.bind(this)}
              />
              <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
                {match => (
                  <Videos filters={this.state.filters} isMobile={match} />
                )}
              </Media>
            </div>
          )
        }}
      />
    )
  }

  async getTerms () {
    try {
      const client = new CPTApiClient('video-gallery')
      const response = await client.getTerms()

      const termsResponse: BCorpTermsResponse = response.data
      const filterOptions = this.processTermsForState(termsResponse)

      return this.setState({ filterOptions })
    } catch (err) {
      console.log(err)
    }
  }

  processTermsForState (termsResponse: BCorpTermsResponse): FilterOptionsState {
    const filterOptions = {}

    termsResponse.tax_names.forEach(taxName => {
      filterOptions[taxName] = {}

      termsResponse[taxName].forEach(term => {
        const { slug, name } = term
        filterOptions[taxName][slug] = name
      })
    })

    return filterOptions
  }
}

export default VideoGallery

export { filterDefault, filterDefaultName, filterOptionDefault }
export type { FiltersType, FilterOptionsState }
