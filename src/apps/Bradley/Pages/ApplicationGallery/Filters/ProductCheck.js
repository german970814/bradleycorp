// @flow
import * as React from 'react'
import BCorpCheckboxField from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { Options } from './Filters'
import type { CheckboxObject } from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { FiltersType } from '../ApplicationGallery'

type Props = {
  options: Options,
  title: string,
  updateFilters: (newFilters: FiltersType) => void
}

type State = {
  checkboxes: FiltersType
}

/**
 * Class responsible for getting options for and updating the product line filter
 */
class ProductCheck extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      checkboxes: []
    }
  }

  handleChange (value: CheckboxObject) {
    const checkboxes = value.checkboxes
    this.setState({ checkboxes })
    checkboxes && this.props.updateFilters(checkboxes)
  }

  render () {
    return (
      <BCorpCheckboxField
        title={this.props.title}
        filterState={{ checkboxes: this.state.checkboxes }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    )
  }
}

export default ProductCheck
