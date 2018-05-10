// @flow
import * as React from 'react'
import type { FiltersType } from '../ApplicationGallery'
import type { WPTerm } from '../../../../../lib/types/term_types'
import ProductCheck from './ProductCheck'
import CPTApiClient from '../../../../../api/cpt_client'
import { PostType } from '../ApplicationGallery'

type Props = {
  updateFilters: (tax: string, newFilters: FiltersType) => void
}

type Options = {
  [string]: ?string
}

type FiltersState = {
  [string]: ?Array<WPTerm>
}

type State = {
  filters: FiltersState
};

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

  updateFilters (tax: string, value: FiltersType) {
    this.props.updateFilters(tax, value)
  }

  renderFilters () {
    return (
      <React.Fragment>
        {Object.keys(this.state.filters).map((el, ind) => {
          if (el === 'app_gallery_product_tag' ||
            el === 'app_gallery_tech_info_tag' ||
            el === 'app_gallery_bim_revit_tag') {
            return null
          }

          return (
            <ProductCheck
              key={ind}
              options={this.getOptions(this.state.filters[el] || [])}
              title={el}
              updateFilters={(v: FiltersType) => this.updateFilters(el, v)}
            />
          )
        })}
      </React.Fragment>
    )
  }

  getOptions (terms: Array<WPTerm>) {
    const object: Options = {}
    terms.forEach(el => {
      object[el.slug.toString()] = el.name
    })
    return object
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
