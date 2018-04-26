// @flow
import * as React from 'react'
import BCorpCheckboxField from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { CheckboxObject } from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'

type Props = {
  filters: Object,
  options: Object,
  title: string,
  updateFilters: (newFilters: Object) => void
}

/**
 * Class responsible for getting options for and updating the product line filter
 */
class ProductCheck extends React.Component<Props> {
  handleChange (event: CheckboxObject) {
    // const newFilters = { ...this.props.filters }
  }

  render () {
    return <BCorpCheckboxField
      title={this.props.title}
      handleChange={this.handleChange.bind(this)}
      options={this.props.options}
      showOtherField
    />
  }
}

export default ProductCheck
