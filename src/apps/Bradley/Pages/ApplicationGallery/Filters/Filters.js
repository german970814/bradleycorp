// @flow
import * as React from 'react'
import ProductCheck from './ProductCheck'
import CPTApiClient from '../../../../../api/cpt_client'
import { PostType } from '../ApplicationGallery'

type Props = {
  filters: Object,
  updateFilters: (newFilters: Object) => void
}

type State = {
  filters: Object
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

  renderFilters () {
    return (
      <React.Fragment>
        {Object.keys(this.state.filters).map((el, ind) => {
          return <ProductCheck
            key={ind}
            options={this.getOptions(this.state.filters[el])}
            title={el}
            filters={this.props.filters}
            updateFilters={this.props.updateFilters} />
        })}
      </React.Fragment>
    )
  }

  getOptions (filters: Object) {
    const object = {}
    filters.forEach(el => {
      object[el.term_id.toString()] = el.name
    })
    return object
  }

  get options () {
    const object = {}
    Object.keys(this.state.filters).forEach((el, ind) => {

    })
    return object
  }

  render () {
    return (
      <div className={`row`}>
        {this.renderFilters()}
      </div>
    )
  }

  async getApplicationGalleryFilters () {
    const client = new CPTApiClient(PostType)
    const response = await client.getTerms()
    console.log(response.data)
    const filters = {}
    'tax_names' in response.data && response.data.tax_names.forEach(data => {
      filters[data] = response.data[data]
    })
    this.setState({
      filters
    })
  }
}

export default Filters
