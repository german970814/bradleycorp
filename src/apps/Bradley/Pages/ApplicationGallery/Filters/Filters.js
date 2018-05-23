// @flow
import * as React from 'react'
import type { CheckboxesType } from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { TaxAndTermSlugObject } from '../../../../../api/cpt_client'
import type { WPTerm } from '../../../../../lib/types/term_types'
import LeftSidebarCheckboxGroup, {
  getOptionsFromArrayOfTerms
} from '../../../../../lib/components/BCorpFilterField/LeftSidebarCheckboxGroup/LeftSidebarCheckboxGroup'
import CPTApiClient from '../../../../../api/cpt_client'
import { PostType } from '../ApplicationGallery'

type Options = {
  [string]: ?string
}

type FiltersState = {
  [string]: ?Array<WPTerm>
}

type Props = {
  activeFilters: TaxAndTermSlugObject,
  updateActiveFilters: (tax: string, newFilters: CheckboxesType) => void
}

type State = {
  filters: FiltersState
}

/**
 * Class responsible for displaying and updating the filters
 */
class Filters extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {}
    }
  }

  componentDidMount () {
    this.getApplicationGalleryFilters()
  }

  updateActiveFilters (tax: string, value: CheckboxesType) {
    this.props.updateActiveFilters(tax, value)
  }

  renderFilters () {
    return (
      <React.Fragment>
        {Object.keys(this.state.filters).map((el, ind) => {
          if (
            el === 'app_gallery_product_tag' ||
            el === 'app_gallery_tech_info_tag' ||
            el === 'app_gallery_bim_revit_tag'
          ) {
            return null
          }

          return (
            <LeftSidebarCheckboxGroup
              key={ind}
              filterState={this.props.activeFilters[el] || []}
              options={this.getOptions(this.state.filters[el] || [])}
              title={el}
              updateFilters={(v: CheckboxesType) =>
                this.updateActiveFilters(el, v)
              }
              collapseOnMobile
            />
          )
        })}
      </React.Fragment>
    )
  }

  getOptions (terms: Array<WPTerm>) {
    return getOptionsFromArrayOfTerms(terms)
  }

  render () {
    return <div className={`row`}>{this.renderFilters()}</div>
  }

  async getApplicationGalleryFilters () {
    const client = new CPTApiClient(PostType)
    const response = await client.getTerms()
    const data: { tax_names: Array<string> } & FiltersState = response.data
    const filters = {}
    'tax_names' in data &&
      data.tax_names.forEach(taxName => {
        filters[taxName] = data[taxName]
      })
    this.setState({ filters })
  }
}

export default Filters

export type { Options }
